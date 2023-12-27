import { ProductBuilder } from "./products.builder";
import { faker } from "@faker-js/faker";
import { App } from "@infra/app";
import { Prisma } from "@prisma/client";
import request from "supertest";

const app = new App().start();

describe("Products Controller Tests", () => {

    let builder: ProductBuilder;

    beforeEach(() => {
        builder = new ProductBuilder();
    });

    it("[GET] products: validate filters", async () => {
        const result = await request(app).get('/api/v1/products').query({
            id: 'not-valid-uuid',
            name: 'ab',
            active: [123],
        });

        expect(result.status).toBe(422);
        expect(result.body.message).toBe("Validation failed");

        expect(result.body).toHaveProperty("errors");
        expect(result.body.errors.length).toBe(3);
        expect(result.body.errors).toStrictEqual(
            expect.arrayContaining([
                { field: 'id', message: '"id" must be a valid GUID' },
                { field: 'name', message: '"name" length must be at least 3 characters long' },
                { field: 'active', message: '"active" must be a boolean' },
            ])
        );
    });

    it("[GET] products: successfully", async () => {
        builder.mockRepositoryAll();
        const result = await request(app).get('/api/v1/products').query({
            active: 'true'
        });

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('data');
        expect(result.body.data.length).toBe(1);
        expect(result.body.data[0]).toHaveProperty('id');
        expect(result.body.data[0]).toHaveProperty('name');
        expect(result.body.data[0]).toHaveProperty('description');
        expect(result.body.data[0]).toHaveProperty('price');
        expect(result.body.data[0]).toHaveProperty('created_at');
        expect(result.body.data[0]).toHaveProperty('active');
        expect(Object.keys(result.body.data[0]).length).toBe(6);
    });

    it("[GET] products: throws", async () => {
        builder.mockRepositoryAllThrows();
        const result = await request(app).get('/api/v1/products').query({
            active: 'true'
        });

        expect(result.status).toBe(500);
        expect(result.body.message).toBe('Internal Server Error');
    });

    it("[POST] products: validate filters", async () => {
        const result = await request(app).post('/api/v1/products').send({
            name: 'az',
            description: 255,
            price: ['abc'],
        });

        expect(result.status).toBe(422);
        expect(result.body.message).toBe("Validation failed");

        expect(result.body).toHaveProperty("errors");
        expect(result.body.errors.length).toBe(3);
        expect(result.body.errors).toStrictEqual(
            expect.arrayContaining([
                { field: 'name', message: '"name" length must be at least 3 characters long'},
                { field: 'description', message: '"description" must be a string' },
                { field: 'price', message: '"price" must be a number' },
          
            ])
        );
    });

    it("[POST] products: throws", async () => {
        const params = {
            name: 'product faker',
            description: "my description",
            price: new Prisma.Decimal(42.99),
        };
        builder.mockRepositoryCreateThrows();

        const result = await request(app).post('/api/v1/products').send(params);

        expect(result.status).toBe(500);
        expect(result.body.message).toBe('Internal Server Error');
    });

    it("[POST] products: successfully", async () => {
        const params = {
            name: 'product faker',
            description: "my description",
            price: new Prisma.Decimal(42.99),
        };
        builder.mockRepositoryCreate(params);

        const result = await request(app).post('/api/v1/products').send(params);

        expect(result.status).toBe(201);
    });

    it("[PUT] products: validate path params", async () => {
        const uuid = 'not-valid-uuid';
        const result = await request(app).put(`/api/v1/products/${uuid}`).send({
            name: 'product faker',
            price: 42,
        });

        expect(result.status).toBe(422);
        expect(result.body.message).toBe("Validation failed");

        expect(result.body).toHaveProperty("errors");
        expect(result.body.errors.length).toBe(1);
        expect(result.body.errors).toStrictEqual(
            expect.arrayContaining([
                { field: 'id', message: '"id" must be a valid GUID'},
            ])
        );
    });

    it("[PUT] products: validate filters", async () => {
        const uuid = faker.string.uuid();
        const result = await request(app).put(`/api/v1/products/${uuid}`).send({
            name: 'qw',
            description: 42,
            price: ['qwe'],
        });

        expect(result.status).toBe(422);
        expect(result.body.message).toBe("Validation failed");

        expect(result.body).toHaveProperty("errors");
        expect(result.body.errors.length).toBe(3);
        expect(result.body.errors).toStrictEqual(
            expect.arrayContaining([
                { field: 'name', message: '"name" length must be at least 3 characters long'},
                { field: 'description', message: '"description" must be a string' },
                { field: 'price', message: '"price" must be a number' },
          
            ])
        );
    });

    it("[PUT] products: successfully", async () => {
        const uuid = faker.string.uuid();
        const params = {
            name: 'product faker',
            description: "my description",
            price: new Prisma.Decimal(42.99),
        };

        builder.mockRepositoryFindThrows();

        const result = await request(app).put(`/api/v1/products/${uuid}`).send(params);

        expect(result.status).toBe(404);
        expect(result.body.message).toBe("No Product found");
    });

    it("[PUT] products: successfully", async () => {
        const uuid = faker.string.uuid();
        const params = {
            name: 'product faker',
            description: "my description",
            price: new Prisma.Decimal(42.99),
        };
        builder.mockRepositoryFind(params);
        builder.mockRepositoryUpdate();

        const result = await request(app).put(`/api/v1/products/${uuid}`).send(params);

        expect(result.status).toBe(204);
    });

    it("[DELETE] products: validate path params", async () => {
        const uuid = 'not-valid-uuid';
        const result = await request(app).delete(`/api/v1/products/${uuid}`).send({
            name: 'product faker',
            price: 42,
        });

        expect(result.status).toBe(422);
        expect(result.body.message).toBe("Validation failed");

        expect(result.body).toHaveProperty("errors");
        expect(result.body.errors.length).toBe(1);
        expect(result.body.errors).toStrictEqual(
            expect.arrayContaining([
                { field: 'id', message: '"id" must be a valid GUID'},
            ])
        );
    });

    it("[DELETE] products: successfully", async () => {
        const uuid = faker.string.uuid();

        builder.mockRepositoryFindThrows();

        const result = await request(app).delete(`/api/v1/products/${uuid}`);

        expect(result.status).toBe(404);
        expect(result.body.message).toBe("No Product found");
    });

    it("[DELETE] products: successfully", async () => {
        const uuid = faker.string.uuid();

        builder.mockRepositoryFind();
        builder.mockRepositoryDelete();

        const result = await request(app).delete(`/api/v1/products/${uuid}`);

        expect(result.status).toBe(204);
    });
});
