import 'express-async-errors'
import './responder'
import shortlinkMiddleware from './shortlink'
import multiparty from 'connect-multiparty'
import imagecache from './media/imagecache'
import deeplinkMiddleware from './deeplink'
import rollbarMiddleware from './rollbar'
import legacyMiddleware from './legacy'
import serverMiddleware from './server'
import staticMiddleware from './static'
import bodyParser from 'body-parser'
import homeMiddleware from './home'
import qrcode from './media/qrcode'
import apiMiddleware from './api'
//import caman from './media/caman'
import express from 'express'
import arena from './arena'
import voice from './voice'
import ping from './ping'
import dav from './dav'
import fax from './fax'
import sms from './sms'
import qs from 'qs'

const server = express()

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use(multiparty({ uploadDir: './tmp' }))

server.use(arena)

server.use(rollbarMiddleware)

server.use(dav)

server.use(shortlinkMiddleware)

server.use('/voice', voice)

server.use('/fax', fax)

server.use('/sms', sms)

server.use('/ping', ping)

server.use('/imagecache', imagecache)

server.use('/qr', qrcode)

//server.use('/caman', caman)

server.use('/.well-known', deeplinkMiddleware)

server.use(staticMiddleware)

server.use(serverMiddleware)

server.use('/admin*', homeMiddleware)

server.use('/api', apiMiddleware)

server.use(legacyMiddleware)

server.use((req, res) => res.send('not found'))

export default server
