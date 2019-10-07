import { Router } from 'express'
import members from './members'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id/members', members)

export default router
