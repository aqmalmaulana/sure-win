import { Request, Response } from 'express';
import {  ErrorType } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { CustomerService } from '../../../services/internal/customerService';
import { v4 as uuid } from 'uuid';
import { ExternalXenditService } from '../../../services/external/externalXenditSevice';
import { apiRouter } from '../../../interfaces';
import { BusinessError } from '../../../helper/handleError';

const path = "/v1/customer/"
const method = "PUT"
const auth = true
const bodyValidation: Validation[]= [
    {
        name: "mobileNo",
        type: "number",
        isMobileNo: true,
        required: true
    },
    {
        name: "id",
        type: "string",
        required: true
    },
    {
        name: "email",
        type: "string",
        required: true
    },
    {
        name: "name",
        type: "string",
        required: true
    }
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        id: string;
        mobileNo: number;
        email: string;
        name: string;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    const customerService = new CustomerService()
    const externalXenditSevice = new ExternalXenditService()

    const existCustomer = await customerService.findById(requestBody.id)
    if(!existCustomer) {
        throw new BusinessError("Invalid User", ErrorType.NotFound);
    }

    const updateCustomer = await customerService.update({
        id: existCustomer.id,
        name: requestBody.name,
        email: requestBody.email,
        mobileNo: requestBody.mobileNo,
        password: existCustomer.password,
        accountNo: existCustomer.accountNo,
        updatedDate: new Date()
    })

    const patchCustomer = await externalXenditSevice.updateCustomer({
        xenditId: updateCustomer.id,
        name: updateCustomer.name,
        mobileNumber: updateCustomer.mobileNo,
        description: `This customer has updated`
    })

    return res.status(200).send(updateCustomer)
}

const putCustomerRegister: apiRouter = {
    path,
    method,
    main,
    auth
}

export default putCustomerRegister