import { ProductCreateDto, ProductDto, ProductFilterDto, ProductUpdateDto } from "@domain/models/product.dtos";
import prismaClient from "@infra/database/prisma-postgres";
import { Prisma, Product } from "@prisma/client";

export class ProductRepository {
    public constructor(
        private readonly database = prismaClient
    ) { }

    public async all(filters: ProductFilterDto): Promise<Product[]> {
        const or = [
            { name: { contains: filters.name, mode: Prisma.QueryMode.insensitive } },
            { description: { contains: filters.name, mode: Prisma.QueryMode.insensitive } },
        ];

        const products = await this.database.product.findMany({
            where: {
                OR: filters.name ? or : undefined,
                id: filters.id ?? undefined,
                price: filters.price ?? undefined,
                deleted_at: filters.active === false ? { not: null } : null,
            }
        });

        return products ?? [];
    }

    public async find(id: string): Promise<Product> {
        const product = await this.database.product.findFirstOrThrow({
            where: { id, deleted_at: null }
        });

        return product;
    }

    public async create(dto: ProductCreateDto): Promise<Product> {
        const now = new Date;
        const created = await this.database.product.create({
            data: {
                ...dto,
                created_at: now,
                updated_at: now
            }
        });

        return created;
    }

    public async update(id: string, dto: ProductUpdateDto): Promise<Product> {
        const now = new Date;
        const updated = await this.database.product.update({
            where: { id: id, deleted_at: null },
            data: {
                ...dto,
                updated_at: now
            }
        });

        return updated;
    }

    public async delete(id: string): Promise<Product> {
        const now = new Date;

        const deleted = await this.database.product.update({
            where: { id, deleted_at: null },
            data: {
                updated_at: now,
                deleted_at: now
            }
        });

        return deleted;
    }
}
