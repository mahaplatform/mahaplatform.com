import { Router } from 'express'
import update from './update'

const router = new Router({ mergeParams: true })

router.patch('/:reactable_type/:reactable_id/react/:type', update)

export default router
