import { Request, Response } from 'express';
import { ICustomerDto } from '../../../dto/customerDto';
import { ErrorStatus, RoleID } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { ExternalJWTService } from '../../../services/external/externalJWTService';
import { CustomerService } from '../../../services/internal/customerService';

const path = "/v1/customer/login"
const method = "POST"
const auth = false
const bodyValidation: Validation[]= [
    {
        name: "mobileNo",
        type: "number",
        isMobileNo: true,
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
        mobileNo: number;
        password: string;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    const customerService = new CustomerService()
    const externalJWTService = new ExternalJWTService()
    
    const existCustomer: ICustomerDto = await customerService.findByMobileNoAndPassword(requestBody.mobileNo, requestBody.password)
    if(!existCustomer) {
        res.status(401).send({
            error: ErrorStatus.CustomerAlreadyExisst,
            message: "Mobile number or password invalid"
        })
        return
    }
    const accessToken = externalJWTService.createAccessToken({id: existCustomer._id, roleId: existCustomer.roleId})
    const refreshToken = externalJWTService.createRefreshToken({id: existCustomer._id, roleId: existCustomer.roleId})

    res.cookie("cookie", refreshToken, {
        httpOnly: true,
    })

    return res.status(200).send({
        id: existCustomer._id,
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