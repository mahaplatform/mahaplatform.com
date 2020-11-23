import { Router } from 'express'
import preview from './preview'

const router = new Router({ mergeParams: true })

router.get('/:type/:code/preview', preview)

export default router
