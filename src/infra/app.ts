import cors from 'cors';
import express, { NextFunction, Request, Response, json, urlencoded } from 'express';
import http from 'http';
import { createExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import ValidationError from '@infra/http/middlewares/validation-error';
import routerInfo, { routers } from '@infra/routes';
import { apiDocs } from '@docs/schema';

const ENV = String(process.env.APP_ENVIRONMENT);

export class App {
  public app: express.Express;
  private server: http.Server | null = null;

  public constructor(
    private readonly host: string = 'http://localhost',
    private readonly port = 3000
  ) {
    this.app = express();
    this.app = createExpressServer({
      routePrefix: '/api/v1',
    });
  }

  public start(): express.Express {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cors({ origin: '*' }));

    this.app.use('/', routerInfo);

    Object.values(routers).forEach(router => {
      this.app.use('/api/v1/', router);
    });

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocs));

    // this.app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
    //   console.error(err.stack);
    //   res.status(500).send({message: 'Something went wrong.'});
    // })
    this.app.use(ValidationError);

    return this.app;
  }

  public init(): http.Server {
    this.server = this.app.listen(this.port, () => {
      if (ENV !== 'test') {
        console.info(`> Server listening on host: ${this.host}:${this.port}`);
      }
    });

    return this.server;
  }

  public async stop(): Promise<void> {
    console.log(`> Database was destroyed.`);

    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }

          console.log(`> Server was closed.`);

          resolve(true);
        });
      });
    }
  }
}
