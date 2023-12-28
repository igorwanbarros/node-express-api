import { JestConfigWithTsJest } from 'ts-jest';

process.env.APP_ENVIRONMENT = "test";

export default {
    displayName: "test",
    testEnvironment: "node",
    clearMocks: true,
    preset: "ts-jest",
    moduleNameMapper: {
        "@domain/(.*)": "<rootDir>/src/domain/$1",
        "@infra/(.*)": "<rootDir>/src/infra/$1",
        "@utils/(.*)": "<rootDir>/src/utils/$1",
        "@docs/(.*)": "<rootDir>/src/api-docs/$1"
    },
    collectCoverageFrom: [
        "src/**/*.{ts,js}",
        "!src/infra/app.ts",
        "!src/server.ts",
        "!**/*.repository.ts",
        "!src/infra/http/middlewares/*",
        "!src/api-docs/*",
        "!src/utils/errors/*",
    ],
    coverageThreshold: {
        global: {
            statements: 70,
            branches: 70,
            functions: 70,
            lines: 70,
        }
    },
} as JestConfigWithTsJest;
