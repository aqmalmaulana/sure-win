import { Request, Response } from 'express';
import { ErrorStatus } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { CustomerService } from '../../../services/internal/customerService';
import { v4 as uuid } from 'uuid';

const path = "/v1/customer/:id"
const method = "DELETE"
const auth = true
const paramsValidation: Validation[]= [
    {
        name: "id",
        type: "string",
        required: true
    }
]
const main = async(req: Request, res: Response) => {
    const params: {
        id: string;
    } = new Validator(req, res).process(paramsValidation, "params")
    if(!params) {
        return;
    }
    const customerService = new CustomerService()

    const existCustomer = await customerService.findById(params.id)
    if(!existCustomer) {
        res.status(401).send({
            error: ErrorStatus.CustomerNotFound,
            message: "Invalid User"
        })
        return
    }

    const updateCustomer = await customerService.delete(params.id)

    const duplicate = JSON.parse(JSON.stringify(existCustomer))
    for(const key in duplicate) {
        if(key === "password" || key === "delete_flag") {
            delete duplicate[key]
        }
        if(key === "_id") {
            duplicate["id"] = duplicate[key]

            delete duplicate[key]
        }
    }


    return res.status(200).send(duplicate)
}

const deleteCustomer: apiRouter = {
    path,
    method,
    main,
    auth
}

export default deleteCustomer