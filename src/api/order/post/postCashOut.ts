import { Request, Response } from "express";
import Big from "big.js";
Big.strict = true;
import { ErrorType, OrderStatuses, OrderType } from "../../../enum";
import { Validation, Validator } from "../../../helper/validator";
import { CustomerService } from "../../../services/internal/customerService";
import { apiRouter } from "../../../interfaces";
import { BusinessError } from "../../../helper/handleError";
import { Config } from "../../../config";
import { FundService } from "../../../services/internal/fundsService";
import { ExternalNowPaymentsService } from "../../../services/external/externalNowPayments";
import { UniqueGenerator } from "../../../helper/uniqueGenerator";
import { OrderDto } from "../../../dto/orderDto";
import { OrderSerivce } from "../../../services/internal/orderService";

const path = "/v1/order/cash-out";
const method = "POST";
const auth = "user";

const bodyValidation: Validation[] = [
    {
        name: "cifId",
        type: "string",
        required: true,
    },
    {
        name: "amount",
        type: "string",
        required: true,
    },
    {
        name: "currency",
        type: "string",
        default: "trx",
    },
    {
        name: "address",
        type: "string",
        required: true,
    },
];
const main = async (req: Request, res: Response) => {
    const requestBody: {
        cifId: string;
        amount: string;
        currency: string;
        address: string;
    } = new Validator(req, res).process(bodyValidation, "body");
    if (!requestBody) {
        return;
    }

    const config = new Config();
    if (parseFloat(requestBody.amount) < config.minWithdrawal) {
        throw new BusinessError("Inadequate minimum withdrawal", ErrorType.Validation);
    }

    const customerService = new CustomerService();
    const customer = await customerService.findById(requestBody.cifId);
    if (!customer) {
        throw new BusinessError("Invalid customer", ErrorType.NotFound);
    }

    const fundsService = new FundService();
    const fund = await fundsService.findFundByCifId(customer.id);
    if (!fund) {
        throw new BusinessError("Something error with your fund", ErrorType.Internal);
    }

    if (parseFloat(fund.balance) < config.minWithdrawal) {
        throw new BusinessError("Does not meet the withdrawal requirements - 1", ErrorType.Validation);
    }

    const trxRefNo = await UniqueGenerator.invoice(customer, OrderType.SELL);
    const orderService = new OrderSerivce();
    const newOrder: OrderDto = {
        cifId: customer.id,
        trxRefNo,
        description: `Withdrawal for ${customer.username} - ${requestBody.amount}`,
        priceAmount: requestBody.amount,
        priceCurrency: requestBody.currency,
        status: OrderStatuses.WAITING,
        type: OrderType.SELL,
        amount: requestBody.amount,
        payAddress: requestBody.address,
        payAmount: requestBody.amount,
        payCurrency: requestBody.currency,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const order = await orderService.create(newOrder);

    const nowPaymentsService = new ExternalNowPaymentsService();
    const postWithdrawal = await nowPaymentsService.postWithdrawal({
        ipn_callback_url: "",
        withdrawals: [
            {
                address: requestBody.address,
                currency: requestBody.currency,
                amount: parseFloat(requestBody.amount),
                payout_description: `Request withdrawal for ${customer.username} - ${requestBody.amount}`,
                unique_external_id: trxRefNo,
            },
        ],
    });

    if (!postWithdrawal) {
        await orderService.update({
            cifId: customer.id,
            trxRefNo,
            description: `Withdrawal for ${customer.username} - ${order.amount}`,
            priceAmount: order.priceAmount,
            priceCurrency: order.priceCurrency,
            status: OrderStatuses.FAILED,
            type: OrderType.SELL,
            amount: order.amount,
            payAddress: order.payAddress,
            payAmount: order.payAmount,
            payCurrency: order.payCurrency,
            updatedAt: new Date(),
        });
        throw new Error("Something wrong when withdrawal");
    }

    const verify = await nowPaymentsService.verifyWithdrawal(postWithdrawal.id);
    if (!verify) {
        await orderService.update({
            cifId: customer.id,
            trxRefNo,
            description: `Withdrawal for ${customer.username} - ${order.amount}`,
            priceAmount: order.priceAmount,
            priceCurrency: order.priceCurrency,
            status: OrderStatuses.FAILED,
            type: OrderType.SELL,
            amount: order.amount,
            payAddress: order.payAddress,
            payAmount: order.payAmount,
            payCurrency: order.payCurrency,
            updatedAt: new Date(),
        });
        throw new Error("Something wrong when verify withdrawal");
    }

    const updatedOrder = await orderService.update({
        cifId: customer.id,
        trxRefNo,
        description: `Withdrawal for ${customer.username} - ${order.amount}`,
        priceAmount: order.priceAmount,
        priceCurrency: order.priceCurrency,
        status: OrderStatuses.WAITING,
        type: OrderType.SELL,
        amount: order.amount,
        payAddress: order.payAddress,
        payAmount: order.payAmount,
        payCurrency: order.payCurrency,
        updatedAt: new Date(),
        paymentId: postWithdrawal.withdrawals[0].id,
        purchaseId: postWithdrawal.withdrawals[0].batch_withdrawal_id,
    });

    return res.status(200).send(updatedOrder);
};

const postCashOut: apiRouter = {
    path,
    method,
    main,
    auth,
};

export default postCashOut;
