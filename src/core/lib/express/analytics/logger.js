import Logger from '../../services/logger'
import onFinished from 'on-finished'

const logger = (req, res, next) => {

  if(process.env.NODE_ENV === 'production') return next()

  const logger = new Logger('server')

  logger.begin(req)

  onFinished(res, (err, res) => {

    const [,url] = req.originalUrl.match(/^([^?]*)(.*)?$/)

    const data = {
      method: req.method,
      url,
      headers: req.headers,
      params: req.params,
      body: req.body,
      query: req.query,
      team_id: req.team ? req.team.get('id') : null,
      team_title: req.team ? req.team.get('title') : null,
      user_id: req.user ? req.user.get('id') : null,
      user_name: req.user ? req.user.get('full_name') : null,
      device_name: req.device ? req.device.related('display_name').get('text') : null,
      statusCode: res.statusCode
    }

    if(res.error) {
      logger.error(req, `${req.method} ${url}`, data, res.error)
    } else {
      logger.info(req, `${req.method} ${url}`, data)
    }

  })

  next()

}

export default logger
