import winston from '../../services/winston'
import onFinished from 'on-finished'
import _ from 'lodash'

const logger = (req, res, next) => {

  if(process.env.NODE_ENV === 'production') return next()

  const sql = []

  const startTime = process.hrtime()

  req.trx.on('query', (query) => {
    if(!query.__knexQueryUid) return
    sql.push({
      ...query,
      startTime: process.hrtime(),
      duration: 0
    })
  }).on('query-response', (data, query) => {
    const index = _.findIndex(sql, { __knexQueryUid: query.__knexQueryUid })
    if(index) sql[index].duration = _getDuration(sql[index].startTime)
  })

  onFinished(res, (err, res) => {
    const duration = _getDuration(startTime)
    const [,url] = req.originalUrl.match(/^([^?]*)(.*)?$/)
    winston.info({
      message: url,
      request: {
        method: req.method,
        url
      },
      session: _.omit(req.session, ['cookie']),
      params: req.params,
      body: req.body,
      query: req.query,
      user: req.user ? {
        id: req.user.get('id'),
        full_name: req.user.get('full_name')
      } : null,
      response: {
        statusCode: res.statusCode,
        duration
      },
      queries: sql.map(query => ({
        sql: query.sql,
        bindings: query.bindings,
        duration: query.duration
      }))
    })
  })

  next()

}

const _getDuration = (startTime) => {
  const diff = process.hrtime(startTime)
  const ms = diff[0] * 1e3 + diff[1] * 1e-6
  return ms.toFixed(3)
}

export default logger
