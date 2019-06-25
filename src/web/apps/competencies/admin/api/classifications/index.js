import expectations from './expectations'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import list from './list'
import show from './show'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.get('/:id/edit', edit)

router.use('/:classification_id/expectations', expectations)

export default router
