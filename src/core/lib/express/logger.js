import Logger from '../../utils/logger'
import onFinished from 'on-finished'
import _ from 'lodash'

const logger = (req, res, next) => {

  const [,url] = req.originalUrl.match(/^([^?]*)(.*)?$/)

  const logger = new Logger({
    type: 'REQUEST',
    title: url
  })

  logger.begin(req)

  onFinished(res, (err, res) => {
    logger.info(req, {
      method: req.method,
      url,
      session: _.omit(req.session, ['cookie']),
      params: req.params,
      body: req.body,
      query: req.query,
      user_id: req.user ? req.user.get('id') : null,
      user_name: req.user ? req.user.get('full_name') : null,
      statusCode: res.statusCode
    })
  })

  next()

}

export default logger
