import materials from './materials'
import { Router } from 'express'
import lessons from './lessons'
import review from './review'
import update from './update'
import quizes from './quizes'
import show from './show'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.get('/:id', show)

router.patch('/:id', update)

router.patch('/:id/review', review)

router.get('/:id/edit', edit)

router.get('/:id/lessons', lessons)

router.get('/:id/materials', materials)

router.get('/:id/quizes', quizes)

export default router
