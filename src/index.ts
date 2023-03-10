import dotenv from 'dotenv';
import path from "path";
dotenv.config()

if(process.env.NODE_ENV === "PRODUCTION") {
    const envPath = path.resolve('/root/myapp/.env')
    dotenv.config({path: envPath})
}

import express, { Express } from 'express';
import getApp from './app';

(async()=> {
    try {
        const app: Express = express();
        const port = process.env.PORT || 3000;
        const main = getApp(app)

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at ${port}`);
        });
    } catch (error) {
       console.log(error) 
    }
})()