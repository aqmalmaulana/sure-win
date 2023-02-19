import { Request, Response } from 'express';
import { ErrorStatus } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { ExternalXenditService } from '../../../services/external/externalXenditSevice';
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
    console.log(customer)
    if(!customer) {
        res.status(401).send({
            error: ErrorStatus.CustomerNotFound,
            message: "Invalid user"
        })
        return
    }
    const result = await new ExternalXenditService().deleteCustomer("cust-85292a41-af2b-46e7-b014-11b35f8d5bdd")
    console.log(result)
    const duplicate = JSON.parse(JSON.stringify(customer))
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

const getCustomerById: apiRouter = {
    path,
    method,
    main,
    auth
}

export default getCustomerById