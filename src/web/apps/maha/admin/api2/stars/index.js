import { Router } from 'express'
import update from './update'

const router = new Router({ mergeParams: true })

router.patch('/:starrable_type/:starrable_id/star', update)

export default router
