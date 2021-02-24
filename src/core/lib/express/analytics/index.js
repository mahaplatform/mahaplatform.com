import 'express-async-errors'
import mtMiddleware from '@apps/analytics/public/mt'
import transaction from './transaction'
import bodyParser from 'body-parser'
import logger from '../logger'
import express from 'express'
import ping from '../ping'
import qs from 'qs'

const server = express()

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use('/ping', ping)

server.use(transaction)

server.use(logger)

server.use('/mt', mtMiddleware)

server.use((req, res) => res.send('not found'))

export default server
