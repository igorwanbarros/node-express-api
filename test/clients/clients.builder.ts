import { faker } from "@faker-js/faker";
import { Client } from "@prisma/client";
import { ClientRepository } from "@infra/database/repositories/client.repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class ClientBuilder {
    private entities: Client[] = [];

    public addClient(entity: Partial<Client>): this {
        this.entities.push({
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            phone: faker.phone.number(),
            email: faker.internet.email(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            ...entity
        } as Client);

        return this;
    }

    public mockRepositoryAll(entity?: Partial<Client>) {
        this.addClient(entity ?? {});

        return jest.spyOn(ClientRepository.prototype, "all").mockImplementation(
            async () => this.entities
        );
    }

    public mockRepositoryAllThrows() {
        return jest.spyOn(ClientRepository.prototype, "all").mockImplementation(
            async () => { throw new Error('internal error'); }
        );
    }

    public mockRepositoryFind(entity?: Partial<Client>) {
        this.addClient(entity ?? {});

        return jest.spyOn(ClientRepository.prototype, "find").mockImplementation(
            async () => this.entities[0] as Client
        );
    }

    public mockRepositoryFindThrows() {
        return jest.spyOn(ClientRepository.prototype, "find").mockImplementation(
            async () => {
                throw new PrismaClientKnownRequestError(
                    "No Client found",
                    { code: "P2025", clientVersion: "" }
                );
            }
        );
    }

    public mockRepositoryCreate(entity?: Partial<Client>) {
        this.addClient(entity ?? {});

        return jest.spyOn(ClientRepository.prototype, "create").mockImplementation(
            async () => this.entities[0] as Client
        );
    }

    public mockRepositoryCreateThrows() {
        return jest.spyOn(ClientRepository.prototype, "create").mockImplementation(
            async () => { throw new Error('internal error'); }
        );
    }

    public mockRepositoryUpdate(entity?: Partial<Client>) {
        this.addClient(entity ?? {});

        return jest.spyOn(ClientRepository.prototype, "update").mockImplementation(
            async () => this.entities[0] as Client
        );
    }

    public mockRepositoryDelete(entity?: Partial<Client>) {
        this.addClient(entity ?? {});

        return jest.spyOn(ClientRepository.prototype, "delete").mockImplementation(
            async () => this.entities[0] as Client
        );
    }
}
