import performance from './performance'
import deliveries from './deliveries'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/deliveries', deliveries)

router.get('/:id/edit', edit)

router.get('/:id/performance', performance)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
