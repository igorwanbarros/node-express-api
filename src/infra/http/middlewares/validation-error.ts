import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { ApiValidationError } from "@utils/errors/api-error"
import { InternalError } from "@utils/errors/internal-error"
import { NextFunction, Request, Response } from "express"

export interface HTTPError extends Error {
    status?: number
}

export default (
    error: HTTPError,
    _: Partial<Request>,
    res: Response,
    __: NextFunction
): void => {
    responseError(error, res);
}

export const responseError = (
    error: HTTPError,
    res: Response
) => {
    if (error instanceof ApiValidationError) {
        res.status(error.code).json({
            message: error.message,
            errors: error.errors(),
        })

        return
    }

    if (error instanceof InternalError) {
        res.status(error.code).json({ message: error.message })
        return
    }

    if (error instanceof PrismaClientKnownRequestError) {
        res.status(404).json({ message: error.message })
        return
    }

    res.status(500).json({ message: 'Internal Server Error' })
};
