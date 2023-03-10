import { Request, Response } from "express"
import { Validation, Validator } from "../../../helper/validator"
import { apiRouter } from "../../../interfaces"

const path = "/v1/product"
const method = "POST"
const authAdmin = true
const bodyValidation: Validation[]= [
    {
        name: "gameTypeId",
        required: true,
        type: "string"
    },
    {
        name: "name",
        required: true,
        type: "string"
    },
    {
        name: "currency",
        required: true,
        type: "string"
    },
    {
        name: "description",
        required: true,
        type: "string"
    },
    {
        name: "category",
        required: true,
        type: "string"
    },
    {
        name: "isActive",
        required: true,
        type: "boolean"
    },

]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        gameTypeId: string;
        name: string;
        currency: string;
        description: string;
        category: string;
        isActive: boolean;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    // const gameTyoe = 
}

const postCustomerRegister: apiRouter = {
    path,
    method,
    main,
    authAdmin
}

export default postCustomerRegister