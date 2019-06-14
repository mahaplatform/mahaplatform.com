import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import show from './show'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.get('/:id/edit', edit)

export default router
