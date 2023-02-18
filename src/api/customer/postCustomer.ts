import { Request, Response } from 'express';
import { ErrorStatus } from '../../enum';
import { Validation, Validator } from '../../helper/validator';
import { apiRouter } from '../../interfaces';
import { CustomerService } from '../../services/customerService';

const path = "/v1/customer/registration"
const method = "POST"
const auth = false
const schemaValidation: Validation[]= [
    {
        name: "mobileNo",
        type: "number",
        required: true
    },
    {
        name: "password",
        type: "string",
        required: true
    }
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        mobileNo: number;
        password: string;
    } = new Validator(req, res).process(schemaValidation, "body")

    const customerService = new CustomerService()
    
    const existCustomer = await customerService.findByMobileNo(requestBody.mobileNo)
    if(existCustomer) {
        res.status(400).send({
            error: ErrorStatus.CustomerAlreadyExisst,
            message: "Mobile no has registered"
        })
        return
    }
}

const postCustomer: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postCustomer