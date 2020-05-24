import redirect from './redirect'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/:code', redirect)

export default router
