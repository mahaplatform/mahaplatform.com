import { adminMiddleware, publicMiddleware } from './server'
import deeplinkMiddleware from './deeplink'
import mailboxMiddleware from './mailbox'
import rollbarMiddleware from './rollbar'
import faviconMiddleware from './favicon'
import legacyMiddleware from './legacy'
import imagecache from './imagecache'
import emailMiddleware from './email'
import apiMiddleware from './api'
import { Router } from 'express'
import cors from './cors'
import ping from './ping'
import path from 'path'

const platformMiddleware = async () => {

  const router = new Router({ mergeParams: true })

  router.use('/$', (req, res) => res.redirect(`${process.env.WEB_HOST}/admin`))

  router.use('/ping', ping)

  router.use('/imagecache', imagecache)

  router.use('/favicon', faviconMiddleware)

  router.use('/.well-known', deeplinkMiddleware)

  router.use(rollbarMiddleware)

  router.use(emailMiddleware)

  router.use(mailboxMiddleware)

  router.use(await adminMiddleware())

  router.use(await publicMiddleware())

  router.use(await cors(), await apiMiddleware())

  router.use('/js/notifications.js', (req, res) => res.sendFile(path.resolve('public', 'admin', 'js', 'notifications.js')))

  router.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => res.status(404).send('Cannot locate asset'))

  router.use(legacyMiddleware)

  router.use((req, res) => res.send('not found'))

  return router

}

export default platformMiddleware
