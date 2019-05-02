import knex from '../services/knex'
import chalk from 'chalk'
import util from 'util'
import _ from 'lodash'

const requests = {}

const listeners = {}

export const beginLogger = (requestId) => {

  if(!requests[requestId]) _createRequest(requestId)

  listeners[requestId] = {
    query: _startQuery(requestId),
    response: _endQuery(requestId)
  }

  knex.client.on('query', listeners[requestId].query).on('query-response', listeners[requestId].response)

  console.mail = _logMessage('mail', requestId)

}

export const endLogger = (requestId) => {

  knex.client.removeListener('query', listeners[requestId].query).removeListener('query-response', listeners[requestId].response)

  delete requests[requestId]

  delete listeners[requestId]

}

export const withLogger = (middleware) => (req, res, next) => {

  const requestId = _.random(100000, 999999).toString(36)

  beginLogger(requestId)

  middleware(req, res, next)

  res.on('finish', () => {

    printMiddlewareLogger(req, res, requestId)

    endLogger(requestId)

  })

}

export const printMiddlewareLogger = (req, res, requestId) => {

  requests[requestId].duration = _getDuration(requests[requestId].startTime)

  const request = requests[requestId]

  const [,url] = req.originalUrl.match(/^([^?]*)(.*)?$/)

  const [,hostname] = req.headers.host.match(/^([\w.]*):?(\d*)?$/)

  const title = ['REQUEST:  ', `${req.method} ${url}`]

  const head = []

  if(!_.isNil(req.team)) head.push(['TEAM:     ', `${req.team.get('title')} [ ID# ${req.team.get('id')} ]`])

  if(_.isString(req.app)) head.push(['APP:      ', req.app.get('data').title])

  if(!_.isNil(req.user)) head.push(['USER:     ', `${req.user.get('full_name')} [ ID# ${req.user.get('id')} ]`])

  head.push(['HOST:     ', hostname])

  if(!_.isEmpty(req.params)) head.push(['PARAMS:   ', JSON.stringify(req.params)])

  if(!_.isEmpty(req.body)) head.push(['BODY:     ', JSON.stringify(req.body)])

  if(!_.isEmpty(req.query)) head.push(['QUERY:    ', JSON.stringify(req.query)])

  head.push(['RESPONSE: ', `${res.statusCode} rendered in ${request.duration} ms`])

  _printLogger(title, head, request)

}

export const printQueueLogger = (queue, job, requestId) => {

  requests[requestId].duration = _getDuration(requests[requestId].startTime)

  const request = requests[requestId]

  const title = ['QUEUE: ', queue]

  const head = []

  head.push(['JOB:      ', JSON.stringify(job.data)])

  head.push(['RESPONSE: ', `processed in ${request.duration} ms`])

  _printLogger(title, head, request)

}

export const printCronLogger = (cron, requestId) => {

  requests[requestId].duration = _getDuration(requests[requestId].startTime)

  const request = requests[requestId]

  const head = []

  const title = ['CRON:     ', cron]

  head.push(['RESPONSE: ', `processed in ${request.duration} ms`])

  _printLogger(title, head, request)


}

const _startQuery = requestId => query => {

  if(!requests[requestId]) _createRequest(requestId)

  if(!_hasUidBeenMapped(query.__knexUid) && !requests[requestId].__knexUid) {

    requests[requestId].__knexUid = query.__knexUid

  }

  if(_getRequestIdFromUid(query.__knexUid) !== requestId) return

  const uid = query.__knexQueryUid || query.sql

  requests[requestId].log.push({
    type:'query',
    uid,
    duration: 0,
    startTime: process.hrtime(),
    sql: query.sql,
    bindings: query.bindings
  })

}

const _endQuery = requestId => (response, query) => {

  if(_getRequestIdFromUid(query.__knexUid) !== requestId) return

  const uid = query.__knexQueryUid || query.sql

  const index = _.findIndex(requests[requestId].log, { uid } )

  if(!requests[requestId].log[index]) return

  requests[requestId].log[index].duration = _getDuration(requests[requestId].log[index].startTime)

}

const _createRequest = (requestId) => {

  requests[requestId] = {
    startTime: process.hrtime(),
    duration: null,
    log: []
  }

}
const _getDuration = (startTime) => {

  const diff = process.hrtime(startTime)

  const ms = diff[0] * 1e3 + diff[1] * 1e-6

  return ms.toFixed(3)

}

const _hasUidBeenMapped = (uid) => {

  return Object.keys(requests).reduce((mapped, requestId) => {

    return mapped || requests[requestId].__knexUid === uid

  }, false)

}

const _getRequestIdFromUid = (uid) => {

  return Object.keys(requests).reduce((found, requestId) => {

    if(found) return found

    return (requests[requestId].__knexUid === uid) ? requestId : null

  }, null)

}

const _logMessage = (level, requestId) => {

  return function() {

    if(!requests[requestId]) return

    requests[requestId].log.push({
      type:'log',
      level,
      message: util.format.apply(this, arguments)
    })

  }
}

const _printLogger = (title, head, request) => {

  const output = []

  output.push(chalk.bold.white(title[0]) + chalk.white(title[1]))

  head.map(line => {

    output.push(chalk.red(line[0]) +  chalk.grey(line[1]))

  })

  request.log.map(item => {

    if(item.type === 'query') {

      const bindings = item.bindings ? ` {${item.bindings.join(', ')}}` :''

      const duration = item.duration ? ` ${item.duration} ms` :''

      const line = item.sql + chalk.magenta(bindings) + duration

      output.push(chalk.green('SQL: ') + chalk.grey(line))

    }

    if(item.type === 'log') {

      if(item.level === 'log') output.push(chalk.green('LOG: ') + chalk.grey(item.message))

      if(item.level === 'info') output.push(chalk.green('INFO: ') + chalk.grey(item.message))

      if(item.level === 'mail') output.push(chalk.green('MAIL: ') + chalk.grey(item.message))

      if(item.level === 'error') output.push(chalk.green('ERROR: ') + chalk.red(item.message))

    }

  })

  process.stdout.write(output.join('\n') + '\n' + '\n')

}
