import { ProductsController } from "@infra/http/controllers/products.controller";
import { Response, Router } from "express";
import validations from "@infra/http/validations/products.validation";
import validateSchema from "@infra/http/middlewares/validate-schema";

const router = Router();
const controller = new ProductsController();


router.get(
    '/products',
    validateSchema(validations.list),
    controller.list
);

router.post(
    '/products',
    validateSchema(validations.create),
    controller.create
);

router.put(
    '/products/:id',
    validateSchema(validations.update),
    controller.update
);

router.delete(
    '/products/:id',
    validateSchema(validations.delete),
    controller.delete
);

export default router;
