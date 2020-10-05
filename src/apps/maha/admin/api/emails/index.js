import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

export default router
