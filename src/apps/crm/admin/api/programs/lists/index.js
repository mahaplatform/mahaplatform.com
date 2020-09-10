import subscriptions from './subscriptions'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.use('/:list_id/subscriptions', subscriptions)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
