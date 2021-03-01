import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import batch from './batch'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.patch('/', batch)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
