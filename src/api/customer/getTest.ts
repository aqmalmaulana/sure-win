import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Config } from '../../config';
import { Validation } from '../../helper/validator';
import { apiRouter } from '../../interfaces';

const path = "/v1/customer"
const method = "GET"
const auth = false
const schemaValidation: Validation[] = []

const main = async(req: Request, res: Response) => {
    const config = new Config()
    const token = sign("test aja", config.accessTokenKey)
    res.send(token)
}

const getTest: apiRouter = {
    path,
    method,
    main,
    auth
}

export default getTest