import { Request, Response } from 'express';
import { apiRouter } from '../../interfaces';

const path = "/v1/customer/registration"
const method = "POST"
const auth = false

const main = async(req: Request, res: Response) => {
    res.send(req.body)
    console.log(req.body)
}

const postTest: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postTest