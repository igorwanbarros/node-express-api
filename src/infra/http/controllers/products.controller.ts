import { Request, Response } from "express";

export class ProductsController {
    public async list(_: Request, response: Response): Promise<void> {
        response.json({
            data: []
        })
    }

    public async create(_: Request, response: Response): Promise<void> {
        response.status(204).send()
    }

    public async update(_: Request, response: Response): Promise<void> {
        response.status(204).send()
    }

    public async delete(_: Request, response: Response): Promise<void> {
        response.status(204).send()
    }
}
