import transaction from '../transaction'
import bodyParser from 'body-parser'
import feedback from './feedback'
import { Router } from 'express'
import webview from './webview'
import signout from './signout'
import logger from '../logger'
import link from './link'
import open from './open'
import seen from './seen'
import view from './view'

const router = new Router({ mergeParams: true })

router.use(bodyParser.json({ limit: '5mb', type: '*/*' }))

router.use(transaction)

router.use(logger)

router.get('/v:email_code([a-z0-9]{10})', open)

router.get('/c:email_code([a-z0-9]{10}):link_code([a-z0-9]{10})', link)

router.get('/w:email_code([a-z0-9]{10})', webview)

router.get('/ns:codes', seen)

router.get('/nv:code', view)

router.get('/so:code', signout)

router.post('/aws/feedback', feedback)

export default router
