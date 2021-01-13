import winston from './winston'
import _ from 'lodash'

class Logger {

  sql = []
  startTime = null
  type = null
  response = this.response.bind(this)

  constructor(type) {
    this.type = type
  }

  begin(req) {
    this.startTime = process.hrtime()
    if(req.analytics) {
      req.analytics.on('query', this.query.bind(this, 'analytics'))
      req.analytics.on('query-response', this.response)
    }
    if(req.maha) {
      req.maha.on('query', this.query.bind(this, 'maha'))
      req.maha.on('query-response', this.response)
    }
  }

  query(database, query) {
    if(!query.__knexQueryUid) return
    this.sql.push({
      ...query,
      database,
      startTime: process.hrtime(),
      duration: 0
    })
  }

  response(data, query) {
    const index = _.findIndex(this.sql, { __knexQueryUid: query.__knexQueryUid })
    if(index) this.sql[index].duration = this._getDuration(this.sql[index].startTime)
  }

  info(req, title, data = {}) {
    const duration = this._getDuration(this.startTime)
    winston.info({
      message: `${this.type.toUpperCase()}: ${title}`,
      type: this.type,
      title,
      statusCode: 200,
      ...data,
      duration,
      queries: this.sql.map(query => ({
        database: query.database,
        sql: query.sql,
        bindings: query.bindings,
        duration: query.duration
      }))
    })
  }

  error(req, title, data = {}, error = null) {
    const duration = this._getDuration(this.startTime)
    winston.error({
      message: `${this.type.toUpperCase()}: ${title}`,
      type: this.type,
      title,
      statusCode: 500,
      ...data,
      error_message: error.message,
      error_stack: error.stack,
      duration,
      queries: this.sql.map(query => ({
        database: query.database,
        sql: query.sql,
        bindings: query.bindings,
        duration: query.duration
      }))
    })
  }

  _getDuration(startTime) {
    const diff = process.hrtime(startTime)
    const ms = diff[0] * 1e3 + diff[1] * 1e-6
    return ms.toFixed(3)
  }

}

export default Logger
