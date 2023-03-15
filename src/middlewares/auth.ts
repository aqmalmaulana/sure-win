import { NextFunction, Request, Response } from "express";
import {  ErrorType, RoleID } from "../enum";
import { BusinessError } from "../helper/handleError";
import { ExternalJWTService } from "../services/external/externalJWTService";
import crypto from "crypto"
import { Config } from "../config";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers?.authorization
    if(auth) {
        const token = auth.split(" ")[1]
        try {
            const externalJWTService = new ExternalJWTService()
            const check: any = externalJWTService.verifyAccessToken(token)
            if(check?.rid !== RoleID.User && check?.rid !== RoleID.Admin) {
                throw new BusinessError("Invalid Authentication Token", ErrorType.Authentication);
            }
        } catch (error) {
            throw new BusinessError("Invalid Authentication Token " + error.message, ErrorType.Authentication);
        }
    } else {
        throw new BusinessError("Invalid Authentication Token", ErrorType.Authentication);
    }
    next()
}

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    const config = new Config()
    if(config.nodeEnv === "PRODUCTTION") {
        const auth = req.headers?.authorization
        if(auth) {
            const token = auth.split(" ")[1]
            try {
                const externalJWTService = new ExternalJWTService()
                const check: any = externalJWTService.verifyAccessToken(token)
                if(check?.rid !== RoleID.Admin) {
                    throw new BusinessError("Invalid Authentication Token", ErrorType.Authentication);
                }
            } catch (error) {
                throw new BusinessError("Invalid Authentication Token " + error.message, ErrorType.Authentication);
            }
        } else {
            throw new BusinessError("Invalid Authentication Token", ErrorType.Authentication);
        }
    } else {
        next()
    }
}

export const authNowPayments = (req: Request, res: Response, next: NextFunction) => {
    const auth: any = req.headers['x-nowpayments-sig']
    console.log(auth)
    if(auth) {
        const config = new Config()
        const hmac = crypto.createHmac('sha512', config.nowPaymentsSecretKey)
        console.log(JSON.stringify(req.body, Object.keys(req.body).sort()))
        hmac.update(JSON.stringify(req.body, Object.keys(req.body).sort()))
        const sign = hmac.digest('hex');
        console.log(sign)
        console.log(auth)
        if(sign !== auth) {
            throw new BusinessError("Invalid Signature", ErrorType.Validation);
        }
    } else {
        throw new BusinessError("Invalid Authentication Token", ErrorType.Authentication);
    }
    next()
}

export const authCronjob = (req: Request, res: Response, next: NextFunction) => {
    // const auth: any = req.headers['x-nowpayments-sig']
    // console.log(auth)
    // if(auth) {
    //     const config = new Config()
    //     const hmac = crypto.createHmac('sha512', config.nowPaymentsSecretKey)
    //     console.log(JSON.stringify(req.body, Object.keys(req.body).sort()))
    //     hmac.update(JSON.stringify(req.body, Object.keys(req.body).sort()))
    //     const sign = hmac.digest('hex');
    //     console.log(sign)
    //     console.log(auth)
    //     if(sign !== auth) {
    //         throw new BusinessError("Invalid Signature", ErrorType.Validation);
    //     }
    // } else {
    //     throw new BusinessError("Invalid Authentication Token", ErrorType.Authentication);
    // }
    next()
}