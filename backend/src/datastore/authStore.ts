import bcrypt from "bcrypt";
import logger from "@app/logger";
import { sign } from "@app/utils/jwt";
import { UserStore } from "./userStore";
import { AppError, StatusCode } from "@app/exceptions/AppError";

export class AuthStore {
  constructor(private userStore: UserStore) {}

  async login(name: string, password: string): Promise<string | null> {
    const user = await this.userStore.getByName(name);

    if (!user) {
      const message = "User not found";
      throw new AppError({ message, statusCode: StatusCode.NOT_FOUND });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const message = "Password does not match";
      logger.error(message);
      throw new AppError({ message, statusCode: StatusCode.NOT_FOUND });
    }

    const token = sign({ user_id: user.user_id });
    return token;
  }

  async register(name: string, password: string) {
    logger.info(`Registering user ${name}`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userStore.getByName(name);

    if (user) {
      const message = "User already exists";
      logger.error(message);
      throw new AppError({ message, statusCode: StatusCode.BAD_REQUEST });
    }

    logger.info(`User ${name} registered`);
    return await this.userStore.create({ name, password: hashedPassword });
  }
}
