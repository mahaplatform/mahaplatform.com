import { adminMiddleware, publicMiddleware } from './server'
import { withLogger } from '../../utils/logger'
import deeplinkMiddleware from './deeplink'
import mailboxMiddleware from './mailbox'
import rollbarMiddleware from './rollbar'
import faviconMiddleware from './favicon'
import legacyMiddleware from './legacy'
import imagecache from './imagecache'
import emailMiddleware from './email'
import apiMiddleware from './api'
import cors from './cors'
import ping from './ping'
import path from 'path'

import multiparty from 'connect-multiparty'
import bodyParser from 'body-parser'
import qs from 'qs'
import express from 'express'


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

  server.use(rollbarMiddleware)

  server.use(emailMiddleware)

  server.use(mailboxMiddleware)

  server.use(await adminMiddleware())

  server.use(await publicMiddleware())

  server.use(await cors(), await apiMiddleware())

  server.use('/js/notifications.js', (req, res) => res.sendFile(path.resolve('public', 'admin', 'js', 'notifications.js')))

  server.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => res.status(404).send('Cannot locate asset'))

  server.use(legacyMiddleware)

  server.use((req, res) => res.send('not found'))

  return (process.env.NODE_ENV !== 'production') ? withLogger(server) : server

}

export default platformMiddleware
