import { Request, Response, NextFunction, Router } from 'express';
import { authAdmin, authCronjob, authNowPayments, authUser } from '../middlewares/auth';
import deleteCustomer from './customer/detele/deleteCustomer';
import getCustomerById from './customer/get/getCustomerById';
import postCustomerLogin from './customer/post/postCustomerLogin';
import postCustomerRegister from './customer/post/postCustomerRegistration';
import putCustomer from './customer/put/putCustomer';
import putCustomerPassword from './customer/put/putCustomerPassword';
import getCronjobNewGame from './game/crobjob/getCreateGameCrobjob';
import postGameType from './game/post/postGameType';
import postUserGame from './game/post/postUserGame';
import postBackUrl from './order/post/postBackUrl';
import postBackUrlWithdrawal from './order/post/postBackUrlWithdrawal';
import postCashIn from './order/post/postCashIn';
import postCashOut from './order/post/postCashOut';
import postProduct from './product/post/postProduct';

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
    postCashIn,
    postCashOut,
    postBackUrl,
    postBackUrlWithdrawal,

    // Product
    postProduct,

    // Game
    postGameType,
    postUserGame,

    // Cronjob
    getCronjobNewGame
]

for(const api of apis) {
    let { path, method, auth } = api;
    if(!path.startsWith("/api")) {
        path = "/api" + path
    }

    let authorization
    if (auth === "user") {
        authorization = authUser;
    } else if (auth === "admin") {
        authorization = authAdmin;
    } else if (auth === "nowpayments") {
        authorization = authNowPayments;
    } else if (auth === "cronjob") {
        authorization = authCronjob;
    }

    const main = (req: Request, res: Response, next: NextFunction) => api.main(req, res, next).catch(next)
    if(auth === "guess") {
        router[method.toLowerCase()](path, main)
    } else {
        router[method.toLowerCase()](path, authorization ,main)
    }
}

export default router