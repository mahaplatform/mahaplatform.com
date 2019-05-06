import { withLogger } from '../../utils/logger'
import multiparty from 'connect-multiparty'
import deeplinkMiddleware from './deeplink'
import mailboxMiddleware from './mailbox'
import rollbarMiddleware from './rollbar'
import faviconMiddleware from './favicon'
import legacyMiddleware from './legacy'
import serverMiddleware from './server'
import domainMiddleware from './domain'
import imagecache from './imagecache'
import emailMiddleware from './email'
import bodyParser from 'body-parser'
import apiMiddleware from './api'
import express from 'express'
import cors from './cors'
import ping from './ping'
import path from 'path'
import qs from 'qs'

const platformMiddleware = async (server) => {

  server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

  server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

  server.use(bodyParser.json({ limit: '5mb' }))

  server.use(multiparty({ uploadDir: './tmp' }))

  server.use(express.static(path.resolve(__dirname, 'public'), { redirect: false }))

  server.use('/$', (req, res) => res.redirect(`${process.env.WEB_HOST}/admin`))

  server.use('/ping', ping)

  server.use('/imagecache', imagecache)

  server.use('/favicon.ico', faviconMiddleware)

  server.use('/.well-known', deeplinkMiddleware)

  const router = express.Router({ mergeParams: true })

  router.use(rollbarMiddleware)

  router.use(emailMiddleware)

  router.use(mailboxMiddleware)

  router.use('/admin', domainMiddleware(serverMiddleware()))

  router.use(await cors(), await apiMiddleware())

  router.use('/js/notifications.js', (req, res) => res.sendFile(path.resolve('public', 'admin', 'js', 'notifications.js')))

  router.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => res.status(404).send('Cannot locate asset'))

  router.use(legacyMiddleware)

  router.use((req, res) => res.send('not found'))

  const middleware = (process.env.NODE_ENV !== 'production') ? withLogger(router) : router

  server.use(middleware)


}

export default platformMiddleware
