import { Request, Response } from "express"
import { Validation, Validator } from "../../../helper/validator"
import { apiRouter } from "../../../interfaces"
import { ProductService } from "../../../services/internal/productService"
import { v4 as uuid } from 'uuid';
import { ProductDto } from "../../../dto/productDto";
import { BusinessError } from "../../../helper/handleError";
import { ErrorType } from "../../../enum";

const path = "/v1/product/:productId"
const method = "GET"
const auth = false
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
    const product: ProductDto = await productService.findProductById(requestBody.productId)
    if(!product) {
        throw new BusinessError("ProductId tidak valid", ErrorType.NotFound);
    }

    const priceAfterDiscount = JSON.parse(JSON.stringify(product))

    res.status(200).send(priceAfterDiscount)
}

const getProductById: apiRouter = {
    path,
    method,
    main,
    auth
}

export default getProductById