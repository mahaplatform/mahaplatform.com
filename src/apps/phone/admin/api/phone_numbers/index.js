import { Router } from 'express'
import publish from './publish'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id/publish', publish)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
