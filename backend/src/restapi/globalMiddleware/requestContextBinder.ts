import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import context from "@app/logger/context";

export default (req: Request, res: Response, next: NextFunction) => {
  const ctx = context.getContext() ?? context.createContext();
  ctx.bindEmitter(req);
  ctx.bindEmitter(res);
  ctx.run(() => {
    context.set("correlation_id", uuidv4());
    next();
  });
};
