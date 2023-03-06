import { Request, Response } from "express"
import { Validation, Validator } from "../../../helper/validator"
import { apiRouter } from "../../../interfaces"
import { ProductService } from "../../../services/internal/productService"
import { v4 as uuid } from 'uuid';
import { ProductDto } from "../../../dto/productDto";

const path = "/v1/product"
const method = "GET"
const auth = false
const query: Validation[]= [
    {
        name: "category",
        type: "string",
        required: true
    },
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        category: string
    } = new Validator(req, res).process(query, "query")
    if(!requestBody) {
        return;
    }

    const productService = new ProductService()
    const products: ProductDto[] = await productService.findProductsByCategory(requestBody.category)
    if(products.length === 0) {
        return res.send(products)
    }
    
    const priceAfterDiscount = JSON.parse(JSON.stringify(products))
    for(const product of priceAfterDiscount) {
        product.priceAfterDiscount = ((100 - product.discount) / 100) * product.price
    }

    return res.status(200).send(priceAfterDiscount)
}

const getProductBycategory: apiRouter = {
    path,
    method,
    main,
    auth
}

export default getProductBycategory