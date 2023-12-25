import cors from 'cors'
import express, { NextFunction, Request, Response, json, urlencoded } from 'express'
import http from 'http'
import { createExpressServer } from 'routing-controllers'
import swaggerUi from 'swagger-ui-express'
import ValidationError from '@infra/http/middlewares/validation-error'
import { routers } from '@infra/routes'
import { apiDocs } from 'src/api-docs/schema'

export class App {
  private app: express.Express
  private server: http.Server | null = null

  public constructor(
    private readonly host: string,
    private readonly port = 3000
  ) {
    this.app = express()
    this.app = createExpressServer({
      routePrefix: '/api/v1',
    })
  }

  public async start(): Promise<http.Server> {
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(cors({ origin: '*' }))
    this.app.use(ValidationError)

    this.app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
      console.error(err.stack)
      res.status(500).send({message: 'Something went wrong.'})
    })

    this.app.use('/', routers.infos)
    this.app.use('/api/v1/', routers.products)

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocs));

    this.server = this.app.listen(this.port, () => {
      console.info(`> Server listening on host: ${this.host}:${this.port}`)
    })

    return this.server
  }

  public async stop(): Promise<void> {

    console.log(`> Database was destroyed.`)

    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err)
          }

          console.log(`> Server was closed.`)

          resolve(true)
        })
      })
    }
  }
}
