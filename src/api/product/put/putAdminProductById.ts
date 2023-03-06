import { Request, Response } from "express"
import { Validation, Validator } from "../../../helper/validator"
import { apiRouter } from "../../../interfaces"
import { ProductService } from "../../../services/internal/productService"
import { v4 as uuid } from 'uuid';

const path = "/v1/product"
const method = "PUT"
const authAdmin = true
const bodyValidation: Validation[]= [
    {
        name: "id",
        type: "string",
        required: true
    },
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
        required: false,
        minNumber: 0,
        maxNumber: 100,
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
    {
        name: "deleteFlag",
        type: "boolean",
        required: false,
    },
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        id: string;
        name: string;
        price: number;
        discount?: number;
        currency: string;
        description: string;
        category: string;
        isActive: boolean;
        deleteFlag: boolean;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    
    const productService = new ProductService()
    const product = await productService.updateProductById(requestBody)

    return res.status(200).send(product)
}

const putAdminProductById: apiRouter = {
    path,
    method,
    main,
    authAdmin
}

export default putAdminProductById