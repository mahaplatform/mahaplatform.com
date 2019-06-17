import { Router } from 'express'
import update from './update'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.patch('/:id', update)

export default router
