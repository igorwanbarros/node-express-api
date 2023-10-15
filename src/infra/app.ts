import cors from 'cors'
import express, { json, urlencoded } from 'express'
import http from 'http'
import ValidationError from './http/middlewares/validation-error'
import { routers } from './routes'
import swaggerUi from 'swagger-ui-express'
import { apiDocs } from 'src/api-docs/schema'

export default class App {
  private app: express.Express = express()
  private server: http.Server | null = null

  public constructor(
    private readonly host: string,
    private readonly port = 3000
  ) { }

  public async init(): Promise<void> {
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(cors({ origin: '*' }))
    this.app.use(ValidationError)

    this.app.use('/', routers.infos)
    this.app.use('/api/v1/', routers.endpoints)

    this.apiDocs();
  }

  public start(): http.Server {
    this.server = this.app.listen(this.port, () => {
      console.log(`> Server listening on port ${this.host}:${this.port}`)
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

  private apiDocs() {
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(apiDocs)
    );
  }
}
