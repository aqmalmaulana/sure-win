import { Request, Response } from "express"
import { Validation, Validator } from "../../../helper/validator"
import { apiRouter } from "../../../interfaces"
import { ProductService } from "../../../services/internal/productService"
import { v4 as uuid } from 'uuid';
import { ProductDto } from "../../../dto/productDto";

const path = "/v1/products"
const method = "GET"
const auth = false
const paramsvalidation: Validation[]= []

const main = async(req: Request, res: Response) => {
    const requestBody = new Validator(req, res).process(paramsvalidation, "params")
    if(!requestBody) {
        return;
    }

    const productService = new ProductService()
    const products: ProductDto[] = await productService.findAll()

    const priceAfterDiscount = JSON.parse(JSON.stringify(products))
    for(const product of priceAfterDiscount) {
        product.priceAfterDiscount = ((100 - product.discount) / 100) * product.price
    }
    res.status(200).send(priceAfterDiscount)
}

const getProducts: apiRouter = {
    path,
    method,
    main,
    auth
}

export default getProducts