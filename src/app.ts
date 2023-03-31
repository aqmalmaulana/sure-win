import { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import router from "./api";
import "./database";
import { responseHandler } from "./middlewares/responseHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authSignSureWin } from "./middlewares/auth";

const getApp = (app: Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(
        cors({
            origin: ["http://localhost:3000", "https://sandbox.nowpayments.io"],
            credentials: true,
        }),
    );
    app.use(authSignSureWin);
    app.use(cookieParser());
    app.use(router);
    app.use(responseHandler);
    app.use("*", (req: Request, res: Response) => {
        res.status(404);
        res.send({
            time: new Date(),
            message: "Cannot find path " + req.originalUrl,
            method: req.method,
        });
    });
};

export default getApp;
