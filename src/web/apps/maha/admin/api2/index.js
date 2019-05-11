import { Router } from 'express'
import account from './account'
import activate from './activate'
import assets from './assets'

const router = new Router({ mergeParams: true })

router.use('/account', account)

router.use('/activate', activate)

router.use('/assets', assets)

export default router
