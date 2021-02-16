import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:id', show)

export default router
