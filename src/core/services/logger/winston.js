import { createLogger, format, transports } from 'winston'
import GraylogGelf from 'winston-log2gelf'
import chalk from 'chalk'
import path from 'path'
import ejs from 'ejs'
import URL from 'url'
import os from 'os'
import fs from 'fs'

const template = fs.readFileSync(path.join(__dirname, 'log.ejs'), 'utf8')

const graylog = URL.parse(process.env.GRAYLOG_URL)

const logger = createLogger({
  level: 'info',
  format: process.env.NODE_ENV === 'production' ? format.json() : format.printf(data => {
    return ejs.render(template, {
      data,
      chalk
    })
  }),
  transports: [
    ...process.env.NODE_ENV === 'production' ? [new GraylogGelf({
      name: 'Graylog',
      hostname: os.hostname(),
      host: graylog.hostname,
      port: graylog.port,
      protocol: graylog.protocol.replace(':', ''),
      level: 'info',
      handleExceptions: false
    })] : [],
    new transports.Console({
      level: 'info'
    })
  ]
})

export default logger
