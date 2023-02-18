import { Request, Response } from "express";
import { Document } from "mongoose";
import { Validation } from "../helper/validator";

export interface apiRouter {
    main: (req: Request, res: Response)=> void;
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    auth?: boolean;
    authAdmin?: boolean
}