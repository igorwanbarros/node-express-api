import Joi from "joi";
import { Schema } from "./type";

const validations: Schema = {
    list: {
        query: Joi.object({
            id: Joi.string().uuid(),
            name: Joi.string().min(3).max(255),
            email: Joi.string().email(),
            phone: Joi.string().min(8).max(16),
            active: Joi.boolean().truthy('true').falsy('false').default('true'),
        }),
    },
    create: {
        body: Joi.object({
            name: Joi.string().min(3).max(255).required(),
            phone: Joi.string().min(3).max(16).required(),
            email: Joi.string().email().allow(null),
        }),
    },
    update: {
        body: Joi.object({
            name: Joi.string().min(3).max(255).optional(),
            phone: Joi.string().min(8).max(16).optional(),
            email: Joi.string().email().optional(),
        }),
        params: Joi.object({
            id: Joi.string().uuid().required(),
        }),
    },
    delete: {
        params: Joi.object({
            id: Joi.string().uuid().required(),
        }),
    }
};

export default validations;
