import '@core/services/environment'
import app from '@core/analytics/express'
import log from '@core/utils/log'
import { Server } from 'http'

const transport = Server(app)

transport.listen(process.env.ANALYTICS_PORT, () => {
  log('info', 'collector', `Listening on ${process.env.ANALYTICS_PORT}`)
})
