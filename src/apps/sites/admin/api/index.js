import managers from './managers'
import { Router } from 'express'
import sites from './sites'
import types from './types'
import items from './items'

const router = new Router({ mergeParams: true })

router.use('/sites', sites)

router.use('/sites/:site_id/managers', managers)

router.use('/sites/:site_id/types', types)

router.use('/sites/:site_id/types/:type_id/items', items)

export default router
