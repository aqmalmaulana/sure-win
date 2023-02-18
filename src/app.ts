import express, { Application, Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './api';

const getApp = (app: Application)=> {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(router)
  app.use("*", (req: Request, res: Response)=> {
    res.send({
      time: new Date()
    })
  })
}

export default getApp