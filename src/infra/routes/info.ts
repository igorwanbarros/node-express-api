import { Response, Router } from "express";

const router = Router();

router.get('/', (_, res: Response) => {
    res.json({ message: 'ok' });
});

export default router;
