import {Router} from 'express';
import { authorization } from '../middlewares/auth';
import getCustomer from './customer/getCustomer';
import getTest from "./customer/getTest";
import postTest from "./customer/postCustomerRegistration";

let router = Router()

const apis = [
    getTest,
    postTest,
    getCustomer
]

for(const api of apis) {
    if(!api.path.startsWith("/api")) {
        api.path = "/api" + api.path
    }
    const method = api.method.toLocaleLowerCase()

    if(api.auth) {
        router[method](`${api.path}`, authorization , api.main )
    } else {
        router[method](`${api.path}` , api.main )
    }
    
}

export default router