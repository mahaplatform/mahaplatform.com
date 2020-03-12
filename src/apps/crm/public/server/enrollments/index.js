import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:enrollment_code/:code', show)

export default router
