import {Router} from 'express';
import { authorization } from '../middlewares/auth';
import getCustomerById from './customer/get/getCustomerById';
import postCustomerLogin from './customer/post/postCustomerLogin';
import postCustomerRegister from './customer/post/postCustomerRegistration';
import putCustomerRegister from './customer/put/putCustomer';

let router = Router()

const apis = [
    postCustomerLogin,
    postCustomerRegister,
    getCustomerById,
    putCustomerRegister
]

for(const api of apis) {
    if(!api.path.startsWith("/api")) {
        api.path = "/api" + api.path
    }
    const method = api.method.toLocaleLowerCase()

    if(api.authAdmin) {
        router[method](`${api.path}`, authorization, api.main)
    } else if(api.auth) {
        router[method](`${api.path}`, authorization , api.main )
    } else {
        router[method](`${api.path}` , api.main )
    }
    
}

export default router