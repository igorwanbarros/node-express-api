import { ObjectSchema } from "joi";

export type SchemaValidation = {
    headers?: ObjectSchema | null;
    body?: ObjectSchema | null;
    query?: ObjectSchema | null;
    params?: ObjectSchema | null;
};

export type Schema = { [key: string]: SchemaValidation }
