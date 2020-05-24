import { createLogger, format, transports } from 'winston'
import Graylog from 'winston-graylog2'
import chalk from 'chalk'
import os from 'os'

const MahaFormatter = format.printf(data => {
  const { title, type } = data
  const { body, job, params, query, queries, session } = data
  const { user_id, user_name } = data
  const { duration, statusCode } = data
  const { error_message, error_stack } = data
  const log = []
  log.push(`${chalk.white(`${type}:`)} ${title}`)
  if(session && Object.keys(session).length > 0) log.push(`${chalk.red('SESSION:')} ${chalk.grey(JSON.stringify(session))}`)
  if(params && Object.keys(params).length > 0) log.push(`${chalk.red('PARAMS:')} ${chalk.grey(JSON.stringify(params))}`)
  if(body && Object.keys(body).length > 0) log.push(`${chalk.red('BODY:')} ${chalk.grey(JSON.stringify(body))}`)
  if(query && Object.keys(query).length > 0) log.push(`${chalk.red('QUERY:')} ${chalk.grey(JSON.stringify(query))}`)
  if(job && Object.keys(job).length > 0) log.push(`${chalk.red('JOB:')} ${chalk.grey(JSON.stringify(job))}`)
  if(user_id) log.push(`${chalk.red('USER:')}  ${chalk.grey(`${user_name} (#${user_id})`)}`)
  if(error_message) log.push(`${chalk.red('ERROR:')} ${chalk.grey(error_message)}`)
  log.push(`${chalk.red('RESPONSE:')} ${chalk.grey(`${statusCode} rendered in ${duration}ms`)}`)
  if(error_stack) log.push(`${chalk.red('STACKTRACE:')} ${chalk.grey(error_stack.join('\n'))}`)
  queries.map(query => {
    log.push(`${chalk.green('SQL:')} ${chalk.grey(query.sql)} ${chalk.magenta(`[${query.bindings.join(', ')}]`)} ${chalk.grey(`${query.duration}ms`)}`)
  })
  process.stdout.write(`\n\n\n${log.join('\n')}\n`)
})

const logger = createLogger({
  level: 'info',
  format: format.combine(
    MahaFormatter,
    format.errors({ stack: true }),
    format.metadata(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new Graylog({
      name: 'Graylog',
      level: 'debug',
      silent: false,
      handleExceptions: false,
      graylog: {
        servers: [
          { host: process.env.GRAYLOG_HOST, port: 12201 }
        ],
        hostname: os.hostname(),
        facility: 'maha',
        bufferSize: 1350
      }
    }),
    new transports.Console({
      silent: true
    })
  ]
})

export default logger
