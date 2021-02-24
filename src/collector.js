import '@core/services/environment'
import app from '@core/lib/express/analytics'
import log from '@core/utils/log'
import { Server } from 'http'

const transport = Server(app)

transport.listen(process.env.SERVER_PORT, () => {
  log('info', 'collector', `Listening on ${process.env.SERVER_PORT}`)
})
