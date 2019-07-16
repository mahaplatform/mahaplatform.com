import fulfillments from './fulfillments'
import materials from './materials'
import { Router } from 'express'
import reviews from './reviews'
import destroy from './destroy'
import quizes from './quizes'
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

router.get('/:offering_id/materials', materials)

router.get('/:offering_id/fulfillments', fulfillments)

router.use('/:offering_id/quizes', quizes)

router.get('/:offering_id/reviews', reviews)

export default router
