import { Router } from 'express'
import refunds from './refunds'
import token from './token'
import list from './list'
import show from './show'
import voyd from './void'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/token', token)

router.get('/:id', show)

router.patch('/:id/void', voyd)

router.use('/:payment_id/refunds', refunds)

export default router
