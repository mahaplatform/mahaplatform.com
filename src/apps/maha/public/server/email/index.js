import { Router } from 'express'
import forward from './forward'
import webview from './webview'
import signout from './signout'
import social from './social'
import link from './link'
import open from './open'
import seen from './seen'
import view from './view'

const router = new Router({ mergeParams: true })

router.use('/f:email_code([a-z0-9]{10})', forward)
router.use('/fo/:email_code([a-z0-9]{10})', forward)

router.get('/v:email_code([a-z0-9]{10})', open)
router.get('/op/:email_code([a-z0-9]{10})', open)

router.get('/c:email_code([a-z0-9]{10}):link_code([a-z0-9]{10})', link)
router.get('/li/:email_code([a-z0-9]{10}):link_code([a-z0-9]{10})', link)

router.get('/w:email_code([a-z0-9]{10})', webview)
router.get('/:type(wv|vw)/:email_code([a-z0-9]{10})', webview)

router.use('/s:service([a-z]{1}):email_code([a-z0-9]{10})', social)
router.use('/so/:service([a-z]{21})/:email_code([a-z0-9]{10})', social)

router.get('/ns/:codes', seen)

router.get('/nv/:code', view)

router.get('/si/:code', signout)

export default router
