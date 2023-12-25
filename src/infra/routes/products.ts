import { Router } from "express";
import { ProductService } from "@domain/services/products/product.service";
import { ProductsController } from "@infra/http/controllers/products.controller";
import validations from "@infra/http/validations/products.validation";
import validateSchema from "@infra/http/middlewares/validate-schema";
import { ProductRepository } from "@infra/database/repositories/product.repository";

const router = Router();

const repository = new ProductRepository();
const service = new ProductService(repository);

const controller = new ProductsController(service);

router.get(
    '/products',
    validateSchema(validations.list),
    async (req, res) => await controller.list(req, res)
);

router.post(
    '/products',
    validateSchema(validations.create),
    async (req, res) => await controller.create(req, res)
);

router.put(
    '/products/:id',
    validateSchema(validations.update),
    async (req, res) => await controller.update(req, res)
);

router.delete(
    '/products/:id',
    validateSchema(validations.delete),
    async (req, res) => await controller.delete(req, res)
);

export default router;
