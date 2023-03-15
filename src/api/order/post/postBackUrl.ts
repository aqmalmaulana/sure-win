import { Request, Response } from 'express';
import { InvoiceStatuses, OrderStatuses, OrderType} from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { OrderSerivce } from '../../../services/internal/orderService';
import { InvoiceService } from '../../../services/internal/invoiceService';
import { Config } from '../../../config';
import { FundService } from '../../../services/internal/fundsService';
import Big from 'big.js';

const path = "/v1/order/back-url"
const method = "POST"
const auth = "nowpayments"

const bodyValidation: Validation[]= [
    {
        name: "payment_id",
        type: "number",
        required: true
    },
    {
        name: "invoice_id",
        type: "number",
        required: true,
    },
    {
        name: "payment_status",
        type: "string",
        required: true
    },
    {
        name: "pay_address",
        type: "string",
    },
    {
        name: "price_amount",
        type: "number",
    },
    {
        name: "price_currency",
        type: "string"
    },
    {
        name: "pay_amount",
        type: "number"
    },
    {
        name: "actually_paid",
        type: "number"
    },
    {
        name: "actually_paid_at_fiat",
        type: "number",
    },
    {
        name: "pay_currency",
        type: "string",
    },
    {
        name: "order_id",
        type: "string",
    },
    {
        name: "order_description",
        type: "string",
    },
    {
        name: "purchase_id",
        type: "string",
    },
    {
        name: "created_at",
        type: "string",
    },
    {
        name: "updated_at",
        type: "string",
    },
    {
        name: "outcome_amount",
        type: "number",
    },
    {
        name: "outcome_currency",
        type: "string",
    },
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        payment_id: number;
        invoice_id: number;
        payment_status: string;
        pay_address: string;
        price_amount: number;
        price_currency: string;
        pay_amount: number;
        actually_paid: number;
        actually_paid_at_fiat: number;
        pay_currency: string;
        order_id: string;
        order_description: string;
        purchase_id: string;
        created_at: string;
        updated_at: string;
        outcome_amount: number;
        outcome_currency: string
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    console.log(requestBody)

    const config = new Config()
    const invoiceService = new InvoiceService()
    const invoice = await invoiceService.findByTrxRefNo(requestBody.order_id)
    if(!invoice) {
        throw new Error("Something went wrong with order_id - invoice");
    }

    const newInvoiceStatus = InvoiceStatuses[requestBody.payment_status.toUpperCase()]
    if(!newInvoiceStatus) {
        throw new Error("Invalid invoice status");
    }

    let orderStatus: OrderStatuses
    if(newInvoiceStatus === InvoiceStatuses.WAITING) {
        orderStatus = OrderStatuses.WAITING
    } else if(newInvoiceStatus === InvoiceStatuses.FINISHED) {
        orderStatus = OrderStatuses.FINISHED
    } else if(newInvoiceStatus === InvoiceStatuses.REFUNDED) {
        orderStatus = OrderStatuses.REJECTED
    } else if(newInvoiceStatus === InvoiceStatuses.FAILED || newInvoiceStatus === InvoiceStatuses.EXPIRED) {
        orderStatus = OrderStatuses.FAILED
    } else {
        orderStatus = OrderStatuses.PROCESSING
    }

    await invoiceService.updateStatus(invoice, newInvoiceStatus)
    const orderService = new OrderSerivce()
    const order = await orderService.findByTrxRefNo(requestBody.order_id)
    if(!order) {
        throw new Error("Something went wrong with order_id - order");
    }

    const updatedOrder = await orderService.update({
        cifId: order.cifId,
        trxRefNo: order.trxRefNo,
        description: order.description,
        priceAmount: requestBody.price_amount.toString(),
        priceCurrency: requestBody.price_currency,
        status: orderStatus,
        type: OrderType[order.type.toUpperCase()],
        amount: requestBody.pay_amount.toString(),
        payAddress: requestBody.pay_address,
        payAmount: requestBody.actually_paid.toString(),
        payCurrency: order.payCurrency,
        purchaseId: requestBody.purchase_id,
        paymentId: requestBody.payment_id.toString(),
        updatedAt: new Date(),
    })

    if(updatedOrder.status === OrderStatuses.FINISHED) {
        const fundService = new FundService()
        const fund = await fundService.findFundByCifId(updatedOrder.cifId)
        const newBalance = new Big(fund.balance).add(updatedOrder.amount)

        await fundService.update({
            cifId: fund.cifId,
            currency: fund.currency,
            balance: newBalance.toString(),
            updatedAt: new Date()
        })
    }

    res.sendStatus(200)
}

const postBackUrl: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postBackUrl