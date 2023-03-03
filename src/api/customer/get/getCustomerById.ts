import { Request, Response } from 'express';
import {  ErrorType } from '../../../enum';
import { BusinessError } from '../../../helper/handleError';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { CustomerService } from '../../../services/internal/customerService';
import { CustomerXenditService } from '../../../services/internal/customerXenditService';

const path = "/v1/customer/:id"
const method = "GET"
const auth = true

const paramsValidation: Validation[] = [
    {
        name: "id",
        required: true,
        type: "string"
    },
]

const main = async(req: Request, res: Response) => {
    const validate = new Validator(req, res)
    const params: {
        id: string;
    } = validate.process(paramsValidation, "params")
    console.log(params)
    
    const customerService = new CustomerService()
    let customer = await customerService.findById(params.id)
    
    if(!customer) {
        throw new BusinessError("Invalid User", ErrorType.NotFound);
    }

    const xenditService = new CustomerXenditService()
    const account = await xenditService.findByAccountNo(customer.accountNo)

    const duplicate = JSON.parse(JSON.stringify(customer))
    for(const key in duplicate) {
        if(key === "password" || key === "delete_flag") {
            delete duplicate[key]
        }
    }
    duplicate.account = account

    return res.status(200).send(duplicate)
}

const getCustomerById: apiRouter = {
    path,
    method,
    main,
    auth
}

export default getCustomerById