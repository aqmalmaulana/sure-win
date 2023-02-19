import { Request, Response } from "express";

export interface apiRouter {
    main: (req: Request, res: Response)=> void;
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    auth?: boolean;
    authAdmin?: boolean
}