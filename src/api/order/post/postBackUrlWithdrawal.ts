import { Request, Response } from 'express';
import { InvoiceStatuses, OrderStatuses, OrderType} from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { OrderSerivce } from '../../../services/internal/orderService';
import { InvoiceService } from '../../../services/internal/invoiceService';
import { Config } from '../../../config';
import { FundService } from '../../../services/internal/fundsService';
import Big from 'big.js';
import { OrderDto } from '../../../dto/orderDto';

const path = "/v1/order/back-url-withdrawal"
const method = "POST"
const auth = "nowpayments"

const bodyValidation: Validation[]= [
    {
        name: "id",
        type: "string",
        required: true
    },
    {
        name: "address",
        type: "string",
        required: true,
    },
    {
        name: "currency",
        type: "string",
        required: true
    },
    {
        name: "amount",
        type: "string",
        required: true
    },
    {
        name: "batchWithdrawalId",
        type: "string",
    },
    {
        name: "status",
        type: "string"
    },
    {
        name: "extra_id",
        type: "string"
    },
    {
        name: "hash",
        type: "string"
    },
    {
        name: "error",
        type: "string",
    },
    {
        name: "createdAt",
        type: "string",
    },
    {
        name: "requestedAt",
        type: "string"
    },
    {
        name: "updatedAt",
        type: "string",
    }
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        id: string;
        address: string;
        currency: string;
        amount: string;
        batchWithdrawalId: string;
        status: string;
        extra_id: string;
        hash: string;
        error: string;
        createdAt: string;
        requestedAt: string;
        updatedAt: string;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }

    console.log(requestBody)

    const orderService = new OrderSerivce()
    const order = await orderService.findByPaymentId(requestBody.id, OrderType.SELL)
    if(!order) {
        throw new Error("Something wrong with payout ID");
    }

    const newStatus = OrderStatuses[requestBody.status.toUpperCase()]
    if(!newStatus) {
        throw new Error("Something wrong with status " + requestBody.status);
    }

    let data: OrderDto = {
        cifId: order.cifId,
        trxRefNo: order.trxRefNo,
        description: order.description,
        priceAmount: order.priceAmount,
        priceCurrency: order.priceCurrency,
        status: newStatus,
        type: OrderType[order.type.toLocaleUpperCase()],
        amount: order.amount,
        payAddress: requestBody.address,
        payAmount: requestBody.amount,
        payCurrency: requestBody.currency,
        purchaseId: requestBody.batchWithdrawalId,
        paymentId: requestBody.id,
        updatedAt: new Date(),
        hash: requestBody.hash,
        remark: requestBody.error
    }
    const updatedOrder = await orderService.update(data)

    if(newStatus === OrderStatuses.FINISHED) {
        const fundService = new FundService()
        const fund = await fundService.findFundByCifId(updatedOrder.cifId)

        const newBalance = new Big(fund.balance).minus(updatedOrder.amount)

        await fundService.update({
            cifId: fund.cifId,
            currency: fund.currency,
            balance: newBalance.toString(),
            updatedAt: new Date()
        })
    }

    res.sendStatus(200)
}

const postBackUrlWithdrawal: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postBackUrlWithdrawal