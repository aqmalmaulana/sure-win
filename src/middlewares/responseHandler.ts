import { Request, Response, NextFunction } from 'express';
import { ErrorStatusCode, ErrorType } from '../enum';

export function responseHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if(error) {
      switch (error.name) {
        case ErrorType.Authentication:
          res.status(ErrorStatusCode.Authentication);
          break;
        case ErrorType.Authorization:
          res.status(ErrorStatusCode.Authorization);
          break;
        case ErrorType.Validation:
          res.status(ErrorStatusCode.Validation);
          break;
        case ErrorType.NotFound:
          res.status(ErrorStatusCode.NotFound);
          break;
        case ErrorType.Duplicate:
          res.status(ErrorStatusCode.Duplicate);
          break;
        default:
          res.status(ErrorStatusCode.Internal);
          break;
      }

      res.send({
        errorCode: error.name,
        message: error.message
      })
      console.log(error)
    }
  return res;
}

export default responseHandler;