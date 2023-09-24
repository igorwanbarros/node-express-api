import cors from 'cors'
import express, { json, urlencoded } from 'express'
import http from 'http'
import ValidationError from './http/middlewares/validation-error'
import { InternalError } from '@utils/errors/internal-error'
import { ApiError } from '@utils/errors/api-error'

export default class App {
  private app: express.Express = express()
  private server: http.Server | null = null

  public constructor(private readonly port = 3000) {}

  public async init(): Promise<void> {
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(cors({ origin: '*' }))
    this.app.use(ValidationError)
    this.app.get('/', (_, res) => {
      res.json({ message: 'ok' })
    })
  }

  public start(): http.Server {
    this.server = this.app.listen(this.port, () => {
      console.log(`> Server listening on port http://localhost:${this.port}`)
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
