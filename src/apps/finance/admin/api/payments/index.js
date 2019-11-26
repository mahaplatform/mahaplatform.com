import { Router } from 'express'
import refunds from './refunds'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import list from './list'
import show from './show'
import voyd from './void'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id/void', voyd)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:payment_id/refunds', refunds)

export default router
