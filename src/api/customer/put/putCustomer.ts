import { Request, Response } from 'express';
import { ErrorStatus } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { CustomerService } from '../../../services/internal/customerService';
import { v4 as uuid } from 'uuid';

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
        name: "name",
        type: "string",
        required: true
    }
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        id: string;
        mobileNo: number;
        name: string;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    const customerService = new CustomerService()

    const existCustomer = await customerService.findById(requestBody.id)
    if(!existCustomer) {
        res.status(401).send({
            error: ErrorStatus.CustomerNotFound,
            message: "Invalid User"
        })
        return
    }

    const updateCustomer = await customerService.update({
        _id: existCustomer._id,
        name: requestBody.name,
        mobileNo: requestBody.mobileNo,
    })

    const duplicate = JSON.parse(JSON.stringify(updateCustomer))
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

const putCustomerRegister: apiRouter = {
    path,
    method,
    main,
    auth
}

export default putCustomerRegister