import { Request, Response } from 'express';
import {  ErrorType, InvoiceStatuses, OrderStatuses, RoleID } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { CustomerService } from '../../../services/internal/customerService';
import { v4 as uuid } from 'uuid';
import { ExternalXenditService } from '../../../services/external/externalXenditSevice';
import { apiRouter } from '../../../interfaces';
import { UniqueGenerator } from '../../../helper/generateNumber';
import { OrderSerivce } from '../../../services/internal/orderService';
import { ProductService } from '../../../services/internal/productService';
import { InvoiceService } from '../../../services/internal/invoiceService';
import { BusinessError } from '../../../helper/handleError';

const path = "/v1/order"
const method = "POST"
const auth = true

const bodyValidation: Validation[]= [
    {
        name: "cifId",
        type: "string",
        required: true
    },
    {
        name: "productId",
        type: "string",
        required: true
    },
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        cifId: string;
        productId: string;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }

    const customerService = new CustomerService()
    const customer = await customerService.findById(requestBody.cifId)
    if(!customer) {
        throw new BusinessError("Invalid User", ErrorType.NotFound);
    }

    const productService = new ProductService()
    const product = await productService.findProductById(requestBody.productId)
    if(!product) {
        throw new BusinessError("Invalid Product Id", ErrorType.NotFound);
    }

    const exXendit = new ExternalXenditService()
    const invoiceNo = await UniqueGenerator.invoice(customer)
    const postInvoice = await exXendit.createInvoice({
        trxRefNo: invoiceNo,
        amount: product.price,
        payer_email: customer.email,
        currency: "IDR",
        customer: {
            given_name: customer.name,
            email: customer.email,
            mobile_number: "+62" + customer.mobileNo
        },
        items: [{
            name: product.name,
            quantity: 1,
            price: product.price
        }],
        accountNo: customer.accountNo,
        description: `Create order for ${product.name}`,
        payment_methods: ["BCA", "BNI", "BRI", "QRIS", "OVO", "DANA", "SHOPEEPAY"]
    })

    
    if(!postInvoice) {
        throw new Error("Something went wrong when postInvoice");
    }

    const invoiceService = new InvoiceService()
    const newInvoice = await invoiceService.create({
        id: uuid(),
        trxRefNo: invoiceNo,
        xenditRefNo: postInvoice.id,
        status: InvoiceStatuses.PENDING,
        merchantName: postInvoice.merchant_name,
        amount: product.price,
        createdDate: new Date(),
        updatedDate: new Date(),
        payerEmail: postInvoice.payer_email || customer.email,
        description: postInvoice.description,
        paymentId: "",
        paidAmount: 0,
        paymentMethod: "",
        ewalletType: "",
        currency: postInvoice.currency,
        paymentChannel: "",
        paymentMethodId: "",
        invoiceUrl: postInvoice.invoice_url,
        items: postInvoice.items
    })

    const orderService = new OrderSerivce()
    const createOrder = await orderService.create({
        id: uuid(),
        trxRefNo: invoiceNo,
        accountNo: customer.accountNo,
        productId: product.id,
        amount: product.price,
        type: "Buy",
        fee: 0,
        status: OrderStatuses.PENDING,
        currency: "IDR",
        updatedDate: new Date(),
        submittedDate: new Date(),
    })

    return res.status(200).send({...createOrder, invoice: newInvoice})
}

const postCashIn: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postCashIn