import { Router } from 'express'
import list from './list'
import show from './show'
import read from './read'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.patch('/:id/read', read)

router.get('/:id', show)

export default router
