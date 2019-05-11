import attachments from './attachments'
import assignees from './assignees'
import activate from './activate'
import { Router } from 'express'
import account from './account'
import devices from './devices'
import assets from './assets'
import links from './links'
import help from './help'

const router = new Router({ mergeParams: true })

router.use('/account', account)

router.use('/activate', activate)

router.use('/assets', assets)

router.use('/assignees', assignees)

router.use('/attachments', attachments)

router.use('/devices', devices)

router.use('/help', help)

router.use('/links', links)

export default router
