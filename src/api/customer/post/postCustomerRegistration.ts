import { Request, Response } from 'express';
import {  ErrorType, RoleID } from '../../../enum';
import { Validation, Validator } from '../../../helper/validator';
import { CustomerService } from '../../../services/internal/customerService';
import { v4 as uuid } from 'uuid';
import { CustomerRoleService } from '../../../services/internal/customerRoleService';
import { UniqueGenerator } from '../../../helper/generateNumber';
import { ExternalXenditService } from '../../../services/external/externalXenditSevice';
import { CustomerXenditService } from '../../../services/internal/customerXenditService';
import { apiRouter } from '../../../interfaces';
import { BusinessError } from '../../../helper/handleError';

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
        name: "email",
        type: "string",
        required: true
    },
    {
        name: "password",
        type: "string",
        required: true
    },
    {
        name: "fullname",
        type: "string",
        required: true,
    }
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        mobileNo: number;
        email: string;
        password: string;
        fullname: string;
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }
    const customerService = new CustomerService()
    const roleService = new CustomerRoleService()
    const externalXenditSevice = new ExternalXenditService()
    
    const existCustomer = await customerService.findByMobileNo(requestBody.mobileNo)
    if(existCustomer) {
        throw new BusinessError("Mobile no has registered", ErrorType.Duplicate);
    }
    
    const userRole = await roleService.findByName("user")
    const accountNo = await UniqueGenerator.accountNo()

    const newCustomer = await customerService.create({
        id: uuid(),
        name: requestBody.fullname,
        mobileNo: requestBody.mobileNo,
        email: requestBody.email,
        password: requestBody.password,
        roleId: userRole?.id || RoleID.User,
        accountNo,
        createdDate: new Date(),
        updatedDate: new Date()
    })

    const customerXendit = await externalXenditSevice.postCustomer({
        accountNo: newCustomer.accountNo,
        name: newCustomer.name,
        mobileNumber: newCustomer.mobileNo,
        description: `New Customer`
    })
    console.log("response Xendit")
    console.log(customerXendit)

    if(customerXendit?.errorCode) {
        throw new Error(customerXendit.message);
    }

    const customerXenditService = new CustomerXenditService()
    await customerXenditService.create({
        id: customerXendit.id,
        accountNo: newCustomer.accountNo,
        type: customerXendit.type,
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