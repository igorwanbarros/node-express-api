import { ClientCreateDto, ClientFilterDto, ClientUpdateDto } from "@domain/models/client.dtos";
import prismaClient from "@infra/database/prisma-postgres";
import { Prisma, Client } from "@prisma/client";

export class ClientRepository {
    public constructor(
        private readonly database = prismaClient
    ) { }

    public async all(filters: ClientFilterDto): Promise<Client[]> {
        const or = [
            {  },
            { description: { contains: filters.name, mode: Prisma.QueryMode.insensitive } },
        ];

        const clients = await this.database.client.findMany({
            where: {
                id: filters.id ?? undefined,
                name: { contains: filters.name, mode: Prisma.QueryMode.insensitive },
                email: { contains: filters.email, mode: Prisma.QueryMode.insensitive },
                phone: { contains: filters.phone, mode: Prisma.QueryMode.insensitive },
                deleted_at: filters.active === false ? { not: null } : null,
            }
        });

        return clients;
    }

    public async find(id: string): Promise<Client> {
        const client = await this.database.client.findFirstOrThrow({
            where: { id, deleted_at: null }
        });

        return client;
    }

    public async create(dto: ClientCreateDto): Promise<Client> {
        const now = new Date;
        const created = await this.database.client.create({
            data: {
                ...dto,
                created_at: now,
                updated_at: now
            }
        });

        return created;
    }

    public async update(id: string, dto: ClientUpdateDto): Promise<Client> {
        const now = new Date;
        const updated = await this.database.client.update({
            where: { id: id, deleted_at: null },
            data: {
                ...dto,
                updated_at: now
            }
        });

        return updated;
    }

    public async delete(id: string): Promise<Client> {
        const now = new Date;

        const deleted = await this.database.client.update({
            where: { id, deleted_at: null },
            data: {
                updated_at: now,
                deleted_at: now
            }
        });

        return deleted;
    }
}
