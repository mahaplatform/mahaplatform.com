import { Router } from 'express'
import members from './members'
import items from './items'

const router = new Router({ mergeParams: true })

router.use('/sites/:site_id/members', members)

router.use('/sites/:site_id/types/:type_id/items', items)

export default router
