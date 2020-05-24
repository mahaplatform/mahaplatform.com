// import Graylog from 'winston-graylog2'
import winston from 'winston'
import chalk from 'chalk'
// import os from 'os'

// const GraylogTransport = new Graylog({
//   name: 'Graylog',
//   level: 'debug',
//   silent: false,
//   handleExceptions: false,
//   graylog: {
//     servers: [
//       { host: process.env.GREYLOG_HOST, port: 12201 }
//     ],
//     hostname: os.hostname(),
//     facility: 'maha',
//     bufferSize: 1350
//   }
// })

const MahaFormatter = winston.format.printf(info => {
  const { body, params, query, queries, request, response, session, user } = info
  const log = []
  log.push(`${chalk.white('REQUEST:')} ${request.method} ${request.url}`)
  if(session && Object.keys(session).length > 0) log.push(`${chalk.red('SESSION:')} ${chalk.grey(JSON.stringify(session))}`)
  if(params && Object.keys(params).length > 0) log.push(`${chalk.red('PARAMS:')} ${chalk.grey(JSON.stringify(params))}`)
  if(body && Object.keys(body).length > 0) log.push(`${chalk.red('BODY:')} ${chalk.grey(JSON.stringify(body))}`)
  if(query && Object.keys(query).length > 0) log.push(`${chalk.red('QUERY:')} ${chalk.grey(JSON.stringify(query))}`)
  if(user) log.push(`${chalk.red('USER:')}  ${chalk.grey(`${user.full_name} (#${user.id})`)}`)
  log.push(`${chalk.red('RESPONSE:')} ${chalk.grey(`${response.statusCode} rendered in ${response.duration}ms`)}`)
  queries.map(query => {
    log.push(`${chalk.green('SQL:')} ${chalk.grey(query.sql)} ${chalk.magenta(`[${query.bindings.join(', ')}]`)} ${chalk.grey(`${query.duration}ms`)}`)
  })
  process.stdout.write(`\n\n\n${log.join('\n')}\n`)
})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    MahaFormatter,
    winston.format.errors({ stack: true }),
    winston.format.metadata(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    // GraylogTransport,
    new winston.transports.Console({
      silent: true
    })
  ]
})

export default logger
