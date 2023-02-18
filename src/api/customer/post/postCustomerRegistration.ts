import { Request, Response } from 'express';
import { ErrorStatus } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { apiRouter } from '../../../interfaces';
import { CustomerService } from '../../../services/internal/customerService';
import { v4 as uuid } from 'uuid';
import { CustomerRoleService } from '../../../services/internal/customerRoleService';

const path = "/v1/customer/registration"
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
    const roleService = new CustomerRoleService()
    
    const existCustomer = await customerService.findByMobileNo(requestBody.mobileNo)
    if(existCustomer) {
        res.status(401).send({
            error: ErrorStatus.CustomerAlreadyExisst,
            message: "Mobile no has registered"
        })
        return
    }
    const userRole = await roleService.findByName("user")

    const newCustomer = await customerService.create({
        _id: uuid(),
        name: "",
        mobile_no: requestBody.mobileNo,
        password: requestBody.password,
        roleId: userRole._id
    })

    return res.status(200).send({
        success: true,
        message: "Registration successfull"
    })
}

const postCustomerRegister: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postCustomerRegister