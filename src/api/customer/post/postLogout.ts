import { Request, Response } from 'express';
import { CustomerDto } from '../../../dto/customerDto';
import {  ErrorType } from '../../../enum';
import { BusinessError } from '../../../helper/handleError';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { ExternalJWTService } from '../../../services/external/externalJWTService';
import { CustomerService } from '../../../services/internal/customerService';

const path = "/v1/customer/login"
const method = "POST"
const auth = "user"
const bodyValidation: Validation[]= [
    {
        name: "email",
        type: "string",
        required: true
    },
    {
        name: "password",
        type: "string",
        required: true
    }
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        email: string;
        password: string;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    const customerService = new CustomerService()
    const externalJWTService = new ExternalJWTService()
    
    const existCustomer: CustomerDto = await customerService.findByEmailOrUsernameAndPassword(requestBody.email, requestBody.password)
    if(!existCustomer) {
        throw new BusinessError("Invalid User", ErrorType.NotFound);
    }
    const accessToken = externalJWTService.createAccessToken({id: existCustomer.id, rid: existCustomer.roleId})
    const refreshToken = externalJWTService.createRefreshToken({id: existCustomer.id, rid: existCustomer.roleId})

    res.cookie("cookie", refreshToken, {
        httpOnly: true,
    })

    return res.status(200).send({
        id: existCustomer.id,
        accessToken,
        refreshToken
    })
}

const postCustomerLogin: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postCustomerLogin