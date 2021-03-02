import 'express-async-errors'
import '@core/lib/express/responder'
import ping from '@core/lib/express/ping'
import publicMiddleware from './public'
import adminMiddleware from './admin'
import bodyParser from 'body-parser'
import express from 'express'
import qs from 'qs'

const server = express()

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use('/ping', ping)

server.use(publicMiddleware)

server.use(adminMiddleware)

server.use((req, res) => res.send('not found'))

export default server
