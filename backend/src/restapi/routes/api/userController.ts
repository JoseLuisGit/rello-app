import { Request, Response, NextFunction, Router } from "express";
import { UserStore } from "@app/datastore/userStore";

export class UserController {
  private router: Router = Router();

  constructor(private userStore: UserStore) {
    this.init();
  }

  public getRouter(): Router {
    return this.router;
  }

  private init(): void {
    this.router.get("/", this.getUsers.bind(this));
  }

  private async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.userStore.getAll();
      res.json({ users: response });
    } catch (err) {
      next(err);
    }
  }
}
