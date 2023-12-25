import { Client } from "@prisma/client";

export type ClientCreateDto = {
    name: string;
    phone: string;
    email?: string;
};

export type ClientUpdateDto = {
    name?: string;
    phone?: string;
    email?: string;
};

export type ClientFilterDto =  {
    id?: string;
    name?: string;
    phone?: string;
    email?: string;
    created_at?: Date;
    active?: boolean;
};

export type ClientDto = Omit<Client, 'updated_at' | 'deleted_at'> & {
    active: boolean;
};

export const convertToClientDto = (client: Client): ClientDto => ({
    id: client.id,
    name: client.name,
    phone: client.phone,
    email: client.email,
    created_at: client.created_at,
    active: client.deleted_at === null,
});
