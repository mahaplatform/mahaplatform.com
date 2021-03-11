import { Router } from 'express'
import pages from './pages'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.use('/:code', pages)

export default router
