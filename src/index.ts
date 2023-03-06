import express, { Express } from 'express';
import dotenv from 'dotenv';
import getApp from './app';

(async()=> {
    if(process.env.NODE_ENV === "PRODUCTION") {
        dotenv.config({path: "/root/myapp/.env"})
    } else {
        dotenv.config()
    }

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