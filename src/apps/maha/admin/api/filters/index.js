import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
