import express, { Application, Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './api';
import "./database"
import { responseHandler } from './middlewares/responseHandler';

const getApp = (app: Application)=> {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(router)
  app.use(responseHandler)
  app.use("*", (req: Request, res: Response)=> {
    res.send({
      time: new Date(),
      message: "Cannot find path " + req.originalUrl,
      method: req.method
    })
  })
}

export default getApp