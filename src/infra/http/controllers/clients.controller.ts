import 'reflect-metadata'
import { ClientCreateDto, ClientFilterDto, ClientUpdateDto } from "@domain/models/client.dtos"
import { ClientService } from "@domain/services/clients/client.service"
import { Request, Response } from "express"

export class ClientsController {
    public constructor(
        private readonly service: ClientService
    ) { }

    public async list(req: Request, response: Response): Promise<void> {
        const data = await this.service.list(req.query as ClientFilterDto);

        response.json({ data });
    }

    public async create(req: Request, response: Response): Promise<void> {
        const client = await this.service.create(
            req.body as ClientCreateDto
        )

        response.status(201).send()
    }

    public async update(req: Request, response: Response): Promise<void> {
        const { id } = req.params;

        await this.service.update(String(id), req.body as ClientUpdateDto);

        response.status(204).send()
    }

    public async delete(req: Request, response: Response): Promise<void> {
        const { id } = req.params;

        await this.service.delete(String(id));

        response.status(204).send()
    }
}
