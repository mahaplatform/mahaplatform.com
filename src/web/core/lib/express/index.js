import 'express-async-errors'
import './responder'
import bodyParserXML from 'body-parser-xml'
import multiparty from 'connect-multiparty'
import deeplinkMiddleware from './deeplink'
import mailboxMiddleware from './mailbox'
import rollbarMiddleware from './rollbar'
import legacyMiddleware from './legacy'
import serverMiddleware from './server'
import staticMiddleware from './static'
import imagecache from './imagecache'
import emailMiddleware from './email'
import bodyParser from 'body-parser'
import homeMiddleware from './home'
import apiMiddleware from './api'
import express from 'express'
import arena from './arena'
import ping from './ping'
import qs from 'qs'

bodyParserXML(bodyParser)

const middleware = async () => {

  const server = express()

  server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

  server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

  server.use(bodyParser.json({ limit: '5mb' }))

  server.use(bodyParser.xml({ limit: '5mb' }))

  server.use(multiparty({ uploadDir: './tmp' }))

  server.use(arena)

  server.use(rollbarMiddleware)

  server.use('/ping', ping)

  server.use('/imagecache', imagecache)

  server.use('/.well-known', deeplinkMiddleware)

  server.use(staticMiddleware)

  server.use('/mailbox', mailboxMiddleware)

  server.use('/admin', serverMiddleware)

  server.use('/admin*', homeMiddleware)

  server.use('/api', await apiMiddleware)

  server.use(emailMiddleware)

  server.use(legacyMiddleware)

  server.use((req, res) => res.send('not found'))

  return server

}

export default middleware
