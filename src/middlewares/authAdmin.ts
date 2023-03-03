import { NextFunction, Request, Response } from "express";
import {  ErrorType, RoleID } from "../enum";
import { BusinessError } from "../helper/handleError";
import { ExternalJWTService } from "../services/external/externalJWTService";

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers?.authorization
    if(auth) {
        const token = auth.split(" ")[1]
        try {
            const externalJWTService = new ExternalJWTService()
            const check: any = externalJWTService.verifyAccessToken(token)
            if(check?.roleId !== RoleID.Admin) {
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