import products from './products.docs';

const host = process.env.HOST ?? 'http://localhost';
const port = process.env.PORT ?? '3000';

const apiDocs = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Express API - Documentation',
        description: 'Documentation API\'s.',
        contact: {
            name: 'Igor Wanderley',
            email: 'igorwanbarros@gmail.com',
            url: 'https://github.com/igorwanbarros',
        },
    },
    servers: [
        {
            url: `${host}:${port}/`,
            description: 'Local Server - Development',
        },
        // {
        //     url: 'https://api.mysite.com',
        //     description: 'Production Server',
        // },
    ],
    tags: [
        { name: 'products' },
        { name: 'clients' },
        { name: 'orders' },
    ],
    paths: {
        ...products.paths
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            ...products.schemas,
        },
    },
};

export { apiDocs };
