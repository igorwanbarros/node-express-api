import Joi from "joi";
import { Schema } from "./type";

const validations: Schema = {
    list: {
        query: Joi.object({
            id: Joi.string().uuid(),
            name: Joi.string().min(3).max(255),
        }),
    },
    create: {
        body: Joi.object({
            name: Joi.string().min(3).max(255).required(),
            description: Joi.string().min(3).max(255).allow(null),
            price: Joi.number().positive().precision(2).max(999999999).required(),
        }),
    },
    update: {
        body: Joi.object({
            name: Joi.string().min(3).max(255).not(null),
            description: Joi.string().min(3).max(255).allow(null),
            price: Joi.number().positive().precision(2).max(999999999),
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
