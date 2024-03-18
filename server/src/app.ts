import express from 'express'
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import {
  createExpressMiddleware,
  type CreateExpressContextOptions,
} from '@trpc/server/adapters/express'
import cors from 'cors'
import config from './config'
import type { Database } from './database'
import { appRouter } from './modules'
import type { Context } from './trpc'
import logger from './logger'

export default function createApp(db: Database) {
  const app = express()

  const { sentryDSN } = config
  if (sentryDSN) {
    Sentry.init({
      dsn: sentryDSN,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
        nodeProfilingIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0,
    })
    // The request handler must be the first middleware on the app
    app.use(Sentry.Handlers.requestHandler())
    logger.info('Sentry is active')
  }

  app.use(cors())
  app.use(express.json())

  app.use('/api/health', (_, res) => {
    res.status(200).send('OK')
  })

  

  app.use(
    '/api/v1/trpc',
    createExpressMiddleware({
      createContext: ({ req, res }: CreateExpressContextOptions): Context => ({
        db,
        req,
        res,
      }),

      router: appRouter,
    })
  )
  // The error handler must be registered before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler())
  return app
}
