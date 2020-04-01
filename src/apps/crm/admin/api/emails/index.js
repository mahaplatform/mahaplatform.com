import deliveries from './deliveries/list'
import performance from './performance'
import activities from './activities'
import { Router } from 'express'
import destroy from './destroy'
import bounces from './bounces'
import preview from './preview'
import create from './create'
import update from './update'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/preview', preview)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/activities', activities)

router.get('/:id/bounces', bounces)

router.use('/:email_id/deliveries', deliveries)

router.get('/:id/performance', performance)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
