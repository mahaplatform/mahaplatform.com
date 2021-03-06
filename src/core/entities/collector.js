import app from '@core/lib/express/analytics'
import log from '@core/utils/log'
import { Server } from 'http'

const collector = () => {

  const transport = Server(app)

  transport.listen(process.env.ANALYTICS_PORT, () => {
    log('info', 'collector', `Listening on ${process.env.ANALYTICS_PORT}`)
  })

}

export default collector
