import { Router } from 'express'
import show from './show'
import pass from './pass'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.get('/:code/pass', pass)

export default router
