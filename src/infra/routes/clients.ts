import { Router } from "express";
import { ClientService } from "@domain/services/clients/client.service";
import { ClientsController } from "@infra/http/controllers/clients.controller";
import validations from "@infra/http/validations/clients.validation";
import validateSchema from "@infra/http/middlewares/validate-schema";
import { ClientRepository } from "@infra/database/repositories/client.repository";

const router = Router();

const repository = new ClientRepository();
const service = new ClientService(repository);

const controller = new ClientsController(service);

router.get(
    '/clients',
    validateSchema(validations.list),
    async (req, res) => await controller.list(req, res)
);

router.post(
    '/clients',
    validateSchema(validations.create),
    async (req, res) => await controller.create(req, res)
);

router.put(
    '/clients/:id',
    validateSchema(validations.update),
    async (req, res) => await controller.update(req, res)
);

router.delete(
    '/clients/:id',
    validateSchema(validations.delete),
    async (req, res) => await controller.delete(req, res)
);

export default router;
