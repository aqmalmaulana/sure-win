import { Request, Response } from "express"
import { Validation, Validator } from "../../../helper/validator"
import { apiRouter } from "../../../interfaces"
import { ProductService } from "../../../services/internal/productService"
import { v4 as uuid } from 'uuid';

const path = "/v1/product"
const method = "POST"
const authAdmin = true
const bodyValidation: Validation[]= [
    {
        name: "name",
        type: "string",
        required: true
    },
    {
        name: "price",
        type: "number",
        required: true
    },
    {
        name: "discount",
        type: "number",
        required: false
    },
    {
        name: "currency",
        type: "string",
        required: true
    },
    {
        name: "description",
        type: "string",
        required: true
    },
    {
        name: "category",
        type: "string",
        required: true
    },
    {
        name: "isActive",
        type: "boolean",
        required: false,
        default: true
    },
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        name: string;
        price: number;
        discount?: number;
        currency: string;
        description: string;
        category: string;
        isActive: boolean;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    
    const productService = new ProductService()
    const product = await productService.create({
        id: uuid(),
        ...requestBody,
    })

    return res.status(200).send(product)
}

const postAdminProduct: apiRouter = {
    path,
    method,
    main,
    authAdmin
}

export default postAdminProduct