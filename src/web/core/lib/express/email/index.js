import transaction from '../api2/transaction'
import bodyParser from 'body-parser'
import feedback from './feedback'
import { Router } from 'express'
import signout from './signout'
import link from './link'
import open from './open'
import seen from './seen'
import view from './view'

const emailMiddleware = new Router({ mergeParams: true })

emailMiddleware.use(bodyParser.json({ limit: '5mb', type: '*/*' }))

emailMiddleware.use(transaction)

emailMiddleware.get('/v:email_code([a-z0-9]{4})', open)

emailMiddleware.get('/c:email_code([a-z0-9]{4}):link_code([a-z0-9]{4})', link)

emailMiddleware.get('/ns:codes', seen)

emailMiddleware.get('/nv:code', view)

emailMiddleware.get('/so:code', signout)

emailMiddleware.post('/aws/feedback', feedback)

export default emailMiddleware
