import { Request, Response } from 'express';
import {  ErrorType, InvoiceStatuses, OrderStatuses, OrderType, RoleID } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { CustomerService } from '../../../services/internal/customerService';
import { apiRouter } from '../../../interfaces';
import { OrderSerivce } from '../../../services/internal/orderService';
import { InvoiceService } from '../../../services/internal/invoiceService';
import { BusinessError } from '../../../helper/handleError';
import { ExternalNowPaymentsService } from '../../../services/external/externalNowPayments';
import { Config } from '../../../config';
import { UniqueGenerator } from '../../../helper/uniqueGenerator';

const path = "/v1/order/back-url"
const method = "POST"
const auth = true

// {
//   payment_id: 5606226242,
//   invoice_id: 6306266108,
//   payment_status: 'finished',
//   pay_address: 'TSTRkU4u5pUThVWa7P3TELy5yCWw32e3hK',
//   price_amount: 2.636792,
//   price_currency: 'usd',
//   pay_amount: 39.9,
//   actually_paid: 39.9,
//   actually_paid_at_fiat: 0,
//   pay_currency: 'trx',
//   order_id: 'Test-firstOrder-4',
//   order_description: 'Apple Macbook Pro 2019 x 1',
//   purchase_id: '6276850312',
//   created_at: '2023-03-09T11:10:12.511Z',
//   updated_at: '2023-03-09T11:18:31.280Z',
//   outcome_amount: 39.39507,
//   outcome_currency: 'trx'
// }

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
        type: "number",
        required: true
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
        required: true,
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

    const config = new Config()
    const invoiceService = new InvoiceService()
    const invoice = await invoiceService.findByTrxRefNo(requestBody.order_id)
    if(!invoice) {
        throw new Error("Something went wrong with order_id");
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
}

const postBackUrl: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postBackUrl