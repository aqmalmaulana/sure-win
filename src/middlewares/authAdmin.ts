import { NextFunction, Request, Response } from "express";
import { ErrorStatus } from "../enum";
import { JWTService } from "../services/external/jwtService";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers?.authorization
    if(auth) {
        const token = auth.split(" ")[1]
        try {
            const jwtService = new JWTService()
            const check = jwtService.verifyAccessToken(token)
            console.log(check)
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