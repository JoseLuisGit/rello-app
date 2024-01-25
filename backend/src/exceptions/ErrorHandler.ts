import { Response } from "express";
import { AppError } from "./AppError";


class ErrorHandler {
    private isTrustedError(error: Error) {
        return error instanceof AppError;
    }

    public handleError(error: Error | AppError, response?: Response) {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as AppError, response);
        }
    }

    private handleTrustedError(error: AppError, response: Response) {
        response.status(error.statusCode).json({ message: error.message });
    }
}

export const errorHandler = new ErrorHandler();