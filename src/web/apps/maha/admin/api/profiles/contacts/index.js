import { Router } from 'express'
import preview from './preview'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id/preview', preview)

export default router
