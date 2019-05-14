import { Router } from 'express'
import create from './create'
import update from './update'
import destroy from './destroy'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
