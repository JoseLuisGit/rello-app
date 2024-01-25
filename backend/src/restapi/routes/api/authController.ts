import { Request, Response, NextFunction, Router } from "express";
import { AuthStore } from "@app/datastore/authStore";

export class AuthController {
  private router: Router = Router();

  constructor(private authStore: AuthStore) {
    this.init();
  }

  public getRouter(): Router {
    return this.router;
  }

  private init(): void {
    this.router.post("/login", this.login.bind(this));
    this.router.post("/register", this.register.bind(this));
  }

  private async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, password } = req.body;
      const response = await this.authStore.login(name, password);
      res.json({ token: response });
    } catch (err) {
      next(err);
    }
  }

  private async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, password } = req.body;
      console.log(req.body);
      const response = await this.authStore.register(name, password);
      if (response) {
        res.json({ message: "User created" });
      }
    } catch (err) {
      next(err);
    }
  }
}
