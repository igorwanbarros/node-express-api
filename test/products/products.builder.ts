import { faker } from "@faker-js/faker";
import { Product } from "@prisma/client";
import { ProductRepository } from "@infra/database/repositories/product.repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class ProductBuilder {
    private entities: Product[] = [];

    public addProduct(entity: Partial<Product>): this {
        this.entities.push({
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            description: faker.lorem.words(6),
            price: faker.number.float(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            ...entity
        } as Product);

        return this;
    }

    public mockRepositoryAll(entity?: Partial<Product>) {
        this.addProduct(entity ?? {});

        return jest.spyOn(ProductRepository.prototype, "all").mockImplementation(
            async () => this.entities
        );
    }

    public mockRepositoryAllThrows() {
        return jest.spyOn(ProductRepository.prototype, "all").mockImplementation(
            async () => { throw new Error('internal error'); }
        );
    }

    public mockRepositoryFind(entity?: Partial<Product>) {
        this.addProduct(entity ?? {});

        return jest.spyOn(ProductRepository.prototype, "find").mockImplementation(
            async () => this.entities[0] as Product
        );
    }

    public mockRepositoryFindThrows() {
        return jest.spyOn(ProductRepository.prototype, "find").mockImplementation(
            async () => {
                throw new PrismaClientKnownRequestError(
                    "No Product found",
                    { code: "P2025", clientVersion: "" }
                );
            }
        );
    }

    public mockRepositoryCreate(entity?: Partial<Product>) {
        this.addProduct(entity ?? {});

        return jest.spyOn(ProductRepository.prototype, "create").mockImplementation(
            async () => this.entities[0] as Product
        );
    }

    public mockRepositoryCreateThrows() {
        return jest.spyOn(ProductRepository.prototype, "create").mockImplementation(
            async () => { throw new Error('internal error'); }
        );
    }

    public mockRepositoryUpdate(entity?: Partial<Product>) {
        this.addProduct(entity ?? {});

        return jest.spyOn(ProductRepository.prototype, "update").mockImplementation(
            async () => this.entities[0] as Product
        );
    }

    public mockRepositoryDelete(entity?: Partial<Product>) {
        this.addProduct(entity ?? {});

        return jest.spyOn(ProductRepository.prototype, "delete").mockImplementation(
            async () => this.entities[0] as Product
        );
    }
}
