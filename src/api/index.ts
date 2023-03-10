import {NextFunction, Request, Response, Router} from 'express';
import { authorization } from '../middlewares/auth';
import { authAdmin } from '../middlewares/authAdmin';
import deleteCustomer from './customer/detele/deleteCustomer';
import getCustomerById from './customer/get/getCustomerById';
import postCustomerLogin from './customer/post/postCustomerLogin';
import postCustomerRegister from './customer/post/postCustomerRegistration';
import putCustomer from './customer/put/putCustomer';
import putCustomerPassword from './customer/put/putCustomerPassword';
import postCashIn from './order/post/postCashIn';

let router = Router()

const apis = [
    // Customer
    postCustomerLogin,
    postCustomerRegister,
    getCustomerById,
    putCustomer,
    putCustomerPassword,
    deleteCustomer,

    // Order
    postCashIn
]

for(const api of apis) {
    try {
        if(!api.path.startsWith("/api")) {
            api.path = "/api" + api.path
        }
        const method = api.method.toLocaleLowerCase()
        const main = (req: Request, res: Response, next: NextFunction) => api.main(req, res, next).catch(next)
        if(api.authAdmin) {
            router[method](`${api.path}`, authAdmin , main)
        } else if(api.auth) {
            router[method](`${api.path}`, authorization , main )
        } else {
            router[method](`${api.path}` , main )
        }
    } catch (error) {
        console.log(error)
    }
    
}

export default router