import { Router } from 'express'
import lookup from './lookup'
import create from './create'
import apply from './apply'
import sales from './sales'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/lookup', lookup)

router.get('/:id', show)

router.patch('/:id/apply', apply)

router.get('/:merchant_id/sales', sales)

export default router
