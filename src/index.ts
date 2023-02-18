import express, { Express } from 'express';
import dotenv from 'dotenv';
import getApp from './app';
dotenv.config();

(async()=> {
    const app: Express = express();
    const port = process.env.PORT || 3000;
    const main = getApp(app)

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})()