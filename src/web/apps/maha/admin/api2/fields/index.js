import { Router } from 'express'
import destroy from './destroy'
import reorder from './reorder'
import create from './create'
import update from './update'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.patch('/reorder', reorder)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
