import { Request, Response } from "express"
import { Validation, Validator } from "../../../helper/validator"
import { apiRouter } from "../../../interfaces"
import { ProductService } from "../../../services/internal/productService"
import { v4 as uuid } from 'uuid';

const path = "/v1/product/:productId"
const method = "DELETE"
const authAdmin = true
const paramsvalidation: Validation[]= [
    {
        name: "productId",
        type: "string",
        required: true
    },
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        productId: string
    } = new Validator(req, res).process(paramsvalidation, "params")
    if(!requestBody) {
        return;
    }

    const productService = new ProductService()
    const product = await productService.deleteProductById(requestBody.productId)
    return res.status(200).send(product)
}

const deleteAdminProduct: apiRouter = {
    path,
    method,
    main,
    authAdmin
}

export default deleteAdminProduct