import { Response, Router } from "express";

const router = Router();

router.get('/products', (_, res: Response) => {
    res.json({ message: 'ok' });
});

router.post('/products', (_, res: Response) => {
    res.json({ message: 'ok' });
});

router.put('/products', (_, res: Response) => {
    res.json({ message: 'ok' });
});

router.delete('/products', (_, res: Response) => {
    res.json({ message: 'ok' });
});

export default router;
