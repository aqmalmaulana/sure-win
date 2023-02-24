import express, { Application, Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './api';
import "./database"

const getApp = (app: Application)=> {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(router)
  app.use("*", (req: Request, res: Response)=> {
    res.send({
      time: new Date(),
      message: "Cannot find path " + req.originalUrl
    })
  })
}

export default getApp