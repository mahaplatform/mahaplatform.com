import { Router } from 'express'
import preview from './preview'

const router = new Router({ mergeParams: true })

router.get('/:type/:id/preview', preview)

export default router
