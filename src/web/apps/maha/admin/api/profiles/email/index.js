import { Router } from 'express'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/sent', list('sent'))

router.get('/received', list('received'))

router.get('/:id', show)

export default router
