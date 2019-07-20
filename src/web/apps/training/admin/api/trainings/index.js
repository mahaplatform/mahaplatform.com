import offerings from './offerings'
import materials from './materials'
import { Router } from 'express'
import destroy from './destroy'
import lessons from './lessons'
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

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:training_id/lessons', lessons)

router.use('/:training_id/materials', materials)

router.use('/:training_id/offerings', offerings)

export default router
