import Joi from "joi";
import { Schema } from "./type";

export const validations: Schema = {
    list: {
        body: null,
        query: Joi.object({
            id: Joi.string().uuid(),
            name: Joi.string().min(3).max(255),
        }),
        params: null,
        headers: null,
    },
    create: {
        body: Joi.object({
            name: Joi.string().min(3).max(255).required(),
            description: Joi.string().min(3).max(255).allow(null),
            price: Joi.number().positive().precision(2).max(999999999).required(),
        }),
        query: null,
        params: null,
        headers: null,
    },
    update: {
        body: Joi.object({
            name: Joi.string().min(3).max(255).not(null),
            description: Joi.string().min(3).max(255).allow(null),
            price: Joi.number().positive().precision(2).max(999999999),
        }),
        query: null,
        params: Joi.object({
            id: Joi.string().uuid().required(),
        }),
        headers: null,
    },
    delete: {
        body: null,
        query: null,
        params: Joi.object({
            id: Joi.string().uuid().required(),
        }),
        headers: null,
    }
};
