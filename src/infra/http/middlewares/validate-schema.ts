import { NextFunction, Request, Response } from "express";
import { SchemaValidation } from "../validations/type";
import { ValidationMessageError } from "@utils/errors/api-error";

export default (
    validation?: SchemaValidation
): (req: Request, res: Response, next: NextFunction) => void => {
    if (!validation) {
        return (_req, _res, next) => next();
    }

    return (req, res, next) => {
        const errors: ValidationMessageError[] = [];

        Object.entries(validation).forEach(([key, schema]) => {
            if (!schema) {
                return
            }

            let data;

            if (key == 'headers') { data = req.headers }
            if (key == 'body') { data = req.body }
            if (key == 'query') { data = req.query }
            if (key == 'params') { data = req.params }
            
            const result = schema.validate(data, { abortEarly: false });

            if (result.error) {
                result.error.details.forEach(detail => {
                    errors.push({
                        field: detail.context?.label ?? detail.path.join('.'),
                        message: detail.message,
                    })
                });
            }
        })

        if (errors.length) {
            res.status(422).send({
                message: 'Validation failed',
                errors: errors
            })
            return
        }

        next();
    };
}
