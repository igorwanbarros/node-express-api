import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

const app = express();
const prisma = new PrismaClient();

// TODO: add typing to env's
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || "http://localhost";

app.use(express.json());
app.use(cors({ origin: [host] }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});

app.listen(port, () => {
    console.log(`Server started: \`${host}:${port}\``);
});
