import { ClientCreateDto, ClientDto, ClientFilterDto, ClientUpdateDto, convertToClientDto } from "@domain/models/client.dtos";
import { ClientRepository } from "@infra/database/repositories/client.repository";

export class ClientService {
    public constructor(
        private readonly repository: ClientRepository
    ) { }

    public async list(dto: ClientFilterDto): Promise<ClientDto[]> {
        if (typeof dto.active === 'string') {
            dto.active = dto.active === 'true';
        }

        const clients = await this.repository.all(dto);

        return clients.map(client => convertToClientDto(client));
    }

    public async create(dto: ClientCreateDto): Promise<ClientDto> {
        dto.phone
            .replace('(', '')
            .replace(')', '')
            .replace('.', '')
            .replace('-', '')
            .replace(' ', '');

        const client = await this.repository.create(dto);

        return convertToClientDto(client);
    }

    public async update(id: string, dto: ClientUpdateDto): Promise<ClientDto> {
        dto?.phone
            ?.replace('(', '')
            ?.replace(')', '')
            ?.replace('.', '')
            ?.replace('-', '')
            ?.replace(' ', '');

        const client = await this.repository.find(id);
        const update = await this.repository.update(client.id, dto);

        return convertToClientDto(update);
    }

    public async delete(id: string): Promise<ClientDto> {
        const client = await this.repository.find(id);
        const update = await this.repository.delete(client.id);

        return convertToClientDto(update);
    }
}
