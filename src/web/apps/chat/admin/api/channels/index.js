import { Router } from 'express'
import destroy from './destroy'
import update from './update'
import create from './create'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
