import 'module-alias/register'
import 'reflect-metadata'
import { App } from '@infra/app'

enum ProccessStatus {
  FAILS = 1,
  SUCCESS = 0
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`,
    promise,
    reason
  )

  throw reason
})

process.on('uncaughtException', (error) => {
  console.error(`App exiting due to an uncaught exception: ${error}`, error)

  process.exit(ProccessStatus.FAILS)
});

(async (): Promise<void> => {
  const port = process.env.PORT || 3000
  const host = process.env.HOST || 'http://localhost'
  const app = new App(host, +port)

  try {
    await app.start()

    const exitSignals: NodeJS.Signals[] = [
      'SIGINT',
      'SIGTERM',
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
    await app.stop();
    console.error(`App exited with error: ${error}`)
  }
})()
