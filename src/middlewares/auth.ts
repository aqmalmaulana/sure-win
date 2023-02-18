import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { Config } from "../config";
import { ErrorStatus } from "../enum";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers?.authorization
    if(auth) {
        const config = new Config()
        const token = auth.split(" ")[1]
        try {
            const check: any = verify(token, config.accessTokenKey)
            req.body.tokenId = check.uuid
        } catch (error) {
            return res.status(400).send({
                error: ErrorStatus.JWTInvalidToken,
                message: "Invalid token"
            })
        }
    } else {
        return res.status(400).send({
            error: ErrorStatus.JWTTokenNotFound,
            message: "Invalid token"
        })
    }
    next()
}