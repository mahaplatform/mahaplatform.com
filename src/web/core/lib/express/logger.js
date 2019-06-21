import onFinished from 'on-finished'
import chalk from 'chalk'
import _ from 'lodash'

const logger = (req, res, next) => {

  if(true || process.env.NODE_ENV === 'production') return next()

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
    const log = []
    log.push(`${chalk.white('REQUEST:')} ${req.method} ${url}`)
    if(req.params && Object.keys(req.params).length > 0) log.push(`${chalk.red('PARAMS:')} ${chalk.grey(JSON.stringify(req.params))}`)
    if(req.body && Object.keys(req.body).length > 0) log.push(`${chalk.red('BODY:')} ${chalk.grey(JSON.stringify(req.body))}`)
    if(req.query && Object.keys(req.query).length > 0) log.push(`${chalk.red('QUERY:')} ${chalk.grey(JSON.stringify(req.query))}`)
    if(req.user) log.push(`${chalk.red('USER:')}  ${chalk.grey(`${req.user.get('full_name')} (#${req.user.get('id')})`)}`)
    log.push(`${chalk.red('RESPONSE:')} ${chalk.grey(`${res.statusCode} rendered in ${duration}ms`)}`)
    sql.map(query => {
      log.push(`${chalk.green('SQL:')} ${chalk.grey(query.sql)} ${chalk.magenta(`[${query.bindings.join(', ')}]`)} ${chalk.grey(`${query.duration}ms`)}`)
    })
    process.stdout.write(`\n\n\n${log.join('\n')}\n`)
  })

  next()

}

const _getDuration = (startTime) => {
  const diff = process.hrtime(startTime)
  const ms = diff[0] * 1e3 + diff[1] * 1e-6
  return ms.toFixed(3)
}

export default logger
