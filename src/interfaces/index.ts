import { Request, Response } from "express";
import { Document } from "mongoose";
import { Validation } from "../helper/validator";

export interface apiRouter {
    main: (req: Request, res: Response)=> void;
    method: "GET" | "POST" | "PUT" | "DETELE";
    path: string;
    auth: boolean;
}

export interface ICustomer extends Document {
    _id?: string;
    mobile_no: number;
    password: string;
    created_date?: Date;
    last_updated?: Date;
    delete_flag?: boolean;
}