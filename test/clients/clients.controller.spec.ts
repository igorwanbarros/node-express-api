import { ClientBuilder } from "./clients.builder";
import { faker } from "@faker-js/faker";
import { App } from "@infra/app";
import { Prisma } from "@prisma/client";
import request from "supertest";

const app = new App().start();

describe("Clients Controller Tests", () => {

    let builder: ClientBuilder;

    beforeEach(() => {
        builder = new ClientBuilder();
    });

    it("[GET] clients: validate filters", async () => {
        const result = await request(app).get('/api/v1/clients').query({
            id: 'not-valid-uuid',
            name: 'ab',
            email: 'not-valid.email',
            phone: 'my-not-valid-phone',
            active: [123],
        });

        expect(result.status).toBe(422);
        expect(result.body.message).toBe("Validation failed");

        expect(result.body).toHaveProperty("errors");
        expect(result.body.errors.length).toBe(5);
        expect(result.body.errors).toStrictEqual(
            expect.arrayContaining([
                { field: 'id', message: '"id" must be a valid GUID' },
                { field: 'name', message: '"name" length must be at least 3 characters long' },
                { field: 'email', message: '"email" must be a valid email' },
                { field: 'phone', message: '"phone" length must be less than or equal to 16 characters long' },
                { field: 'active', message: '"active" must be a boolean' },
            ])
        );
    });

    it("[GET] clients: throws error", async () => {
        builder.mockRepositoryAllThrows();
        const result = await request(app).get('/api/v1/clients');

        expect(result.status).toBe(500);
        expect(result.body.message).toBe('Internal Server Error');
    });

    it("[GET] clients: successfully", async () => {
        builder.mockRepositoryAll();
        const result = await request(app).get('/api/v1/clients');

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('data');
        expect(result.body.data.length).toBe(1);
        expect(result.body.data[0]).toHaveProperty('id');
        expect(result.body.data[0]).toHaveProperty('name');
        expect(result.body.data[0]).toHaveProperty('email');
        expect(result.body.data[0]).toHaveProperty('phone');
        expect(result.body.data[0]).toHaveProperty('created_at');
        expect(result.body.data[0]).toHaveProperty('active');
        expect(Object.keys(result.body.data[0]).length).toBe(6);
    });

    it("[POST] clients: validate filters", async () => {
        const result = await request(app).post('/api/v1/clients').send({
            name: 'az',
            phone: 255,
            email: 'abcd',
        });

        expect(result.status).toBe(422);
        expect(result.body.message).toBe("Validation failed");

        expect(result.body).toHaveProperty("errors");
        expect(result.body.errors.length).toBe(3);
        expect(result.body.errors).toStrictEqual(
            expect.arrayContaining([
                { field: 'name', message: '"name" length must be at least 3 characters long'},
                { field: 'email', message: '"email" must be a valid email' },
                { field: 'phone', message: '"phone" must be a string' },
            ])
        );
    });

    it("[POST] clients: successfully", async () => {
        const params = {
            name: 'client faker',
            email: faker.internet.email(),
            phone: '99999-9999',
        };
        builder.mockRepositoryCreate(params);

        const result = await request(app).post('/api/v1/clients').send(params);

        expect(result.status).toBe(201);
    });

    it("[POST] clients: throws", async () => {
        const params = {
            name: 'client faker',
            email: faker.internet.email(),
            phone: '99999-9999',
        };
        builder.mockRepositoryCreateThrows();

        const result = await request(app).post('/api/v1/clients').send(params);

        expect(result.status).toBe(500);
        expect(result.body.message).toBe('Internal Server Error');
    });

    it("[PUT] clients: validate path params", async () => {
        const uuid = 'not-valid-uuid';
        const result = await request(app).put(`/api/v1/clients/${uuid}`).send({
            name: 'client faker',
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

    it("[PUT] clients: validate filters", async () => {
        const uuid = faker.string.uuid();
        const result = await request(app).put(`/api/v1/clients/${uuid}`).send({
            name: 'qw',
            email: 'my-fail.email',
            phone: '999',
        });

        expect(result.status).toBe(422);
        expect(result.body.message).toBe("Validation failed");

        expect(result.body).toHaveProperty("errors");
        expect(result.body.errors.length).toBe(3);
        expect(result.body.errors).toStrictEqual(
            expect.arrayContaining([
                { field: 'name', message: '"name" length must be at least 3 characters long'},
                { field: 'email', message: '"email" must be a valid email' },
                { field: 'phone', message: '"phone" length must be at least 8 characters long' },
            ])
        );
    });

    it("[PUT] clients: throws not found", async () => {
        const uuid = faker.string.uuid();

        builder.mockRepositoryFindThrows();

        const result = await request(app).put(`/api/v1/clients/${uuid}`).send({
            name: 'client fajker',
        });

        expect(result.status).toBe(404);
        expect(result.body.message).toBe("No Client found");
    });

    it("[PUT] clients: successfully", async () => {
        const uuid = faker.string.uuid();
        const params = {
            name: 'client faker',
            email: faker.internet.email(),
            phone: '(99) 99999-9999',
        };
        builder.mockRepositoryFind(params);
        builder.mockRepositoryUpdate();

        const result = await request(app).put(`/api/v1/clients/${uuid}`).send(params);

        expect(result.status).toBe(204);
    });

    it("[DELETE] clients: validate path params", async () => {
        const uuid = 'not-valid-uuid';
        const result = await request(app).delete(`/api/v1/clients/${uuid}`).send({
            name: 'client faker',
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

    it("[DELETE] clients: throws not found", async () => {
        const uuid = faker.string.uuid();

        builder.mockRepositoryFindThrows();
        builder.mockRepositoryDelete();

        const result = await request(app).delete(`/api/v1/clients/${uuid}`);

        expect(result.status).toBe(404);
        expect(result.body.message).toBe("No Client found");
    });

    it("[DELETE] clients: successfully", async () => {
        const uuid = faker.string.uuid();

        builder.mockRepositoryFind();
        builder.mockRepositoryDelete();

        const result = await request(app).delete(`/api/v1/clients/${uuid}`);

        expect(result.status).toBe(204);
    });
});
