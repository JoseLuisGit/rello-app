import { NextFunction, Request, Response } from "express";
import { errorHandler } from "@app/exceptions/ErrorHandler";

const ErrorHandler = () => {
  return (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    errorHandler.handleError(err, res);
    next();
  };
};

export default ErrorHandler;
