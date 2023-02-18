import { Request, Response } from 'express';
import { ErrorStatus } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { CustomerService } from '../../../services/internal/customerService';

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
    const query: {
        id: string;
    } = validate.process(paramsValidation, "params")

    const customerService = new CustomerService()
    let customer = await customerService.findById(query.id)
    if(!customer) {
        res.status(401).send({
            error: ErrorStatus.CustomerNotFound,
            message: "Invalid user"
        })
    }
    
    const duplicate = JSON.parse(JSON.stringify(customer))
    for(const key in duplicate) {
        if(key === "password" || key === "delete_flag") {
            delete duplicate[key]
        }
    }

    return res.status(200).send(duplicate)
}

const getCustomerById: apiRouter = {
    path,
    method,
    main,
    auth
}

export default getCustomerById