import { ObjectSchema } from "joi";

export type SchemaValidation = {
    headers?: ObjectSchema;
    body?: ObjectSchema;
    query?: ObjectSchema;
    params?: ObjectSchema;
};

export type Schema = Record<string, SchemaValidation>;
