import {NextFunction, Request, Response, Router} from 'express';
import { authorization } from '../middlewares/auth';
import { authAdmin } from '../middlewares/authAdmin';
import deleteCustomer from './customer/detele/deleteCustomer';
import getCustomerById from './customer/get/getCustomerById';
import postCustomerLogin from './customer/post/postCustomerLogin';
import postCustomerRegister from './customer/post/postCustomerRegistration';
import putCustomerRegister from './customer/put/putCustomer';
import postCashIn from './order/post/postOrder';
import deleteAdminProduct from './product/delete/deleteAdminProduct';
import getProductById from './product/get/getProductById';
import getProducts from './product/get/getProducts';
import getProductBycategory from './product/get/getProductsByCategory';
import postAdminProduct from './product/post/postAdminProduct';
import putAdminProductById from './product/put/putAdminProductById';

let router = Router()

const apis = [
    // Customer
    postCustomerLogin,
    postCustomerRegister,
    getCustomerById,
    putCustomerRegister,
    deleteCustomer,

    // Order
    postCashIn,

    // Product
    postAdminProduct,
    getProductById,
    getProducts,
    getProductBycategory,
    deleteAdminProduct,
    putAdminProductById
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