import express, { Express } from 'express';
import dotenv from 'dotenv';
import getApp from './app';
import { Config } from './config';

(async()=> {
    const config = new Config()
    if(config.nodeEnv === "PRODUCTION") {
        dotenv.config({path: "/home/user/env/.env"})
    } else {
        dotenv.config()
    }

    try {
        const app: Express = express();
        const port = config.port || 3000;
        const main = getApp(app)

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at ${port}`);
        });
    } catch (error) {
       console.log(error) 
    }
})()