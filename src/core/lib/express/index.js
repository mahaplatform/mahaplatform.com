import 'express-async-errors'
import './responder'
import shortlinkMiddleware from './shortlink'
import multiparty from 'connect-multiparty'
import deeplinkMiddleware from './deeplink'
import rollbarMiddleware from './rollbar'
import transaction from './transaction'
import serverMiddleware from './server'
import mediaMiddleware from './media'
import bodyParser from 'body-parser'
import homeMiddleware from './home'
import apiMiddleware from './api'
import twilio from './twilio'
import logger from './logger'
import express from 'express'
import arena from './arena'
import error from './error'
import ping from './ping'
import dav from './dav'
import qs from 'qs'

const server = express()

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use(multiparty({ uploadDir: './tmp' }))

server.use('/ping', ping)

server.use(mediaMiddleware)

server.use(arena)

server.use(rollbarMiddleware)

server.use(transaction)

server.use(logger)

server.use(dav)

server.use(twilio)

server.use(shortlinkMiddleware)

server.use('/.well-known', deeplinkMiddleware)

server.use('/api', apiMiddleware)

server.use(serverMiddleware)

server.use('/*', homeMiddleware)

server.use((req, res) => res.send('not found'))

server.use(error)

export default server
