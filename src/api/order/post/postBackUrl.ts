import { Request, Response } from 'express';
import { ErrorStatus, RoleID } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { CustomerService } from '../../../services/internal/customerService';
import { v4 as uuid } from 'uuid';
import { CustomerRoleService } from '../../../services/internal/customerRoleService';
import { ExternalXenditService } from '../../../services/external/externalXenditSevice';
import { CustomerXenditService } from '../../../services/internal/customerXenditService';
import { apiRouter } from '../../../interfaces';
import { UniqueGenerator } from '../../../helper/generateNumber';

const path = "/v1/order/back-url"
const method = "POST"
const auth = true

const bodyValidation: Validation[]= []
const main = async(req: Request, res: Response) => {
    const requestBody = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    console.log(requestBody)
    return res.sendStatus(200)
}

const postBackUrl: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postBackUrl