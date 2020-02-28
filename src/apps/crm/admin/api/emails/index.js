import deliveries from './deliveries/list'
import performance from './performance'
import activities from './activities'
import { Router } from 'express'
import destroy from './destroy'
import preview from './preview'
import update from './update'
import edit from './edit'
import show from './show'

const router = new Router({ mergeParams: true })

router.post('/preview', preview)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/activities', activities)

router.use('/:email_id/deliveries', deliveries)

router.get('/:id/performance', performance)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
