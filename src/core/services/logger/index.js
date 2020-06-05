import winston from './winston'
import _ from 'lodash'

class Logger {

  sql = []
  startTime = null
  type = null

  constructor(type) {
    this.type = type
  }

  begin(req) {
    this.startTime = process.hrtime()
    req.trx.on('query', (query) => {
      if(!query.__knexQueryUid) return
      this.sql.push({
        ...query,
        startTime: process.hrtime(),
        duration: 0
      })
    }).on('query-response', (data, query) => {
      const index = _.findIndex(this.sql, { __knexQueryUid: query.__knexQueryUid })
      if(index) this.sql[index].duration = this._getDuration(this.sql[index].startTime)
    })
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
