import 'reflect-metadata'
import App from '@infra/app'
// import { PrismaClient } from '@prisma/client'
// import bodyParser from 'body-parser'
// import cors from 'cors'
// import express from 'express'

// const app = express()
// // const prisma = new PrismaClient()

// // // TODO: add typing to env's
// const port = process.env.PORT || 3000
// const host = process.env.HOSTNAME || 'http://localhost'

// app.use(express.json())
// app.use(cors({ origin: [host] }))
// app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   res.json({ message: 'ok' })
// })

// app.listen(port, () => {
//   console.log(`Server started: \`${host}:${port}\``)
// })
enum ProccessStatus {
  FAILS = 1,
  SUCCESS = 0
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  )

  throw reason
})

process.on('uncaughtException', (error) => {
  console.error(`App exiting due to an uncaught exception: ${error}`)

  process.exit(ProccessStatus.FAILS)
});

(async (): Promise<void> => {
  try {

    const port = process.env.PORT || 3000
    const app = new App(+port)

    await app.init()
    app.start()
  
    const exitSignals: NodeJS.Signals[] = [
      // 'SIGINT',
      // 'SIGTERM',
      'SIGQUIT'
    ]

    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          await app.stop()
          console.info(`App exited with success`)
          process.exit(ProccessStatus.FAILS)
        } catch (error) {
          console.error(`App exited with error: ${error}`)
          process.exit(ProccessStatus.FAILS)
        }
      })
    }
  } catch (error) {
    console.error(`App exited with error: ${error}`)
  }
})()
