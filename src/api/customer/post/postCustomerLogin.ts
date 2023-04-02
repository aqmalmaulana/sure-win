import { Request, Response } from "express";
import { CustomerDto } from "../../../dto/customerDto";
import { ErrorType } from "../../../enum";
import { BusinessError } from "../../../helper/handleError";
import { Validation, Validator } from "../../../helper/validator";
import { apiRouter } from "../../../interfaces";
import { ExternalJWTService } from "../../../services/external/externalJwtService";
import { CustomerService } from "../../../services/internal/customerService";
import RedisService from "../../../services/external/externalRedisService";
import { v4 as uuid } from "uuid";

const path = "/v1/customer/login";
const method = "POST";
const auth = "guess";
const bodyValidation: Validation[] = [
    {
        name: "email",
        type: "string",
        required: true,
    },
    {
        name: "password",
        type: "string",
        required: true,
    },
];
const main = async (req: Request, res: Response) => {
    const requestBody: {
        email: string;
        password: string;
    } = new Validator(req, res).process(bodyValidation, "body");
    if (!requestBody) {
        return;
    }
    const customerService = new CustomerService();
    const externalJWTService = new ExternalJWTService();

    const existCustomer: CustomerDto = await customerService.findByEmailAndPassword(
        requestBody.email,
        requestBody.password,
    );
    if (!existCustomer) {
        throw new BusinessError("Email or Password is incorrect", ErrorType.NotFound);
    }
    const accessToken = externalJWTService.createAccessToken({ id: existCustomer.id, rid: existCustomer.roleId });
    const refreshToken = externalJWTService.createRefreshToken({ id: existCustomer.id, rid: existCustomer.roleId });
    const loginId = uuid();

    let body;
    if (existCustomer.authentication) {
        body = {
            authentication: true,
            loginId,
            id: existCustomer.id,
        };

        const redisService = new RedisService();
        await redisService.set(`login/${existCustomer.id}`, loginId);
    } else {
        body = {
            id: existCustomer.id,
            accessToken,
            refreshToken,
            authentication: false,
        };
    }

    return res.status(200).send(body);
};

const postCustomerLogin: apiRouter = {
    path,
    method,
    main,
    auth,
};

export default postCustomerLogin;
