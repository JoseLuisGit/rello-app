export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorArgs {
  name?: string;
  message: string;
  statusCode: StatusCode;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: number;

  constructor(args: AppErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name ?? "Error";
    this.statusCode = args.statusCode;

    Error.captureStackTrace(this);
  }
}
