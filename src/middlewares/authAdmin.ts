import { NextFunction, Request, Response } from "express";
import { ErrorStatus, RoleID } from "../enum";
import { JWTService } from "../services/external/jwtService";

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers?.authorization
    if(auth) {
        const token = auth.split(" ")[1]
        try {
            const jwtService = new JWTService()
            const check: any = jwtService.verifyAccessToken(token)
            if(check?.roleId !== RoleID.Admin) {
                return res.sendStatus(401)
            }
        } catch (error) {
            return res.status(401).send({
                error: ErrorStatus.JWTInvalidToken,
                message: "Invalid token"
            })
        }
    } else {
        return res.status(401).send({
            error: ErrorStatus.JWTTokenNotFound,
            message: "Invalid token"
        })
    }
    next()
}