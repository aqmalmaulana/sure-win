import { Request, Response } from 'express';
import { ErrorStatus, InvoiceStatuses, RoleID } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { CustomerService } from '../../../services/internal/customerService';
import { v4 as uuid } from 'uuid';
import { ExternalXenditService } from '../../../services/external/externalXenditSevice';
import { apiRouter } from '../../../interfaces';
import { UniqueGenerator } from '../../../helper/generateNumber';
import { OrderSerivce } from '../../../services/internal/orderService';

const path = "/v1/order/cashin"
const method = "POST"
const auth = true

const bodyValidation: Validation[]= [
    {
        name: "cifId",
        type: "string",
        required: true
    },
    {
        name: "amount",
        type: "number",
        required: true
    },
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        cifId: string;
        amount: number;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    console.log(requestBody)

    const customerService = new CustomerService()
    const customer = await customerService.findById(requestBody.cifId)
    if(!customer) {
        res.status(401).send({
            error: ErrorStatus.CustomerNotFound,
            message: "Invalid user"
        })
        return
    }

    const externalXenditSevice = new ExternalXenditService()
    const invoiceNo = await UniqueGenerator.invoice(customer)
    const requestInvoice = await externalXenditSevice.createInvoice({
        trxRefNo: invoiceNo,
        amount: requestBody.amount,
        accountNo: customer.accountNo
    })
    
    const orderService = new OrderSerivce()
    const createOrder = await orderService.create({
        id: uuid(),
        trxRefNo: requestInvoice.external_id,
        accountNo: customer.accountNo,
        amount: requestBody.amount,
        fee: 0,
        status: InvoiceStatuses[requestInvoice.status],
        type: "Buy",
        invoiceUrl: requestInvoice.invoice_url,
        currency: "IDR",
        updatedDate: new Date(),
        submittedDate: new Date(),
    })

    return res.status(200).send(createOrder)
}

const postCashIn: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postCashIn