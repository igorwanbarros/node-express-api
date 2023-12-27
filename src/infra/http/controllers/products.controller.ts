import 'reflect-metadata'
import { ProductCreateDto, ProductFilterDto, ProductUpdateDto } from "@domain/models/product.dtos"
import { ProductService } from "@domain/services/products/product.service"
import { Request, Response } from "express"
import { responseError } from '../middlewares/validation-error';
import { HttpError } from 'routing-controllers';

export class ProductsController {
    public constructor(
        private readonly service: ProductService
    ) { }

    public async list(req: Request, response: Response): Promise<void> {
        try {
            const data = await this.service.list(req.query as ProductFilterDto);

            response.json({ data });
        } catch (error) {
            responseError(error as HttpError, response);
        }
    }

    public async create(req: Request, response: Response): Promise<void> {
        try {
            const product = await this.service.create(
                req.body as ProductCreateDto
            )

            response.status(201).send()
        } catch (error) {
            responseError(error as HttpError, response);
        }
    }

    public async update(req: Request, response: Response): Promise<void> {
        try {
            const { id } = req.params;

            await this.service.update(String(id), req.body as ProductUpdateDto);

            response.status(204).send()
        } catch (error) {
            responseError(error as HttpError, response);
        }
    }

    public async delete(req: Request, response: Response): Promise<void> {
        try {
            const { id } = req.params;

            await this.service.delete(String(id));

            response.status(204).send()
        } catch (error) {
            responseError(error as HttpError, response);
        }
    }
}
