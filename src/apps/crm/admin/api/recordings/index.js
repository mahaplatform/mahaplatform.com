import { Router } from 'express'
import call from './call'

const router = new Router({ mergeParams: true })

router.post('/', call)

export default router
