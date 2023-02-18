import { Request, Response } from 'express';
import { ErrorStatus } from '../../enum';
import { Validation, Validator } from '../../helper/validator';
import { apiRouter } from '../../interfaces';

const path = "/v1/customer/detail"
const method = "GET"
const auth = false

const schemaValidation: Validation[] = [
    {
        name: "name",
        required: true,
        maxLength: 10,
        minLength: 5,
        type: "string"
    },
    {
        name: "umur",
        required: false,
        type: "number"
    },
]

const main = async(req: Request, res: Response) => {
    const validate = new Validator(req, res)
    const query: {
        name: string;
        umur: number;
    } = validate.query(schemaValidation)

    console.log(query)
}

const getCustomer: apiRouter = {
    path,
    method,
    main,
    auth
}

export default getCustomer