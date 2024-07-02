import { app } from './app'
import { env } from './utils/env'

try {
  app.listen({
    port: env.APP_PORT
  }).then(() => {
    if (env.NODE_ENV === 'development') {
      console.log(`The server is running on port ${env.APP_PORT}`)
    }
  })
} catch (err) {
  app.log.error(err)

  process.exit(1)
}
