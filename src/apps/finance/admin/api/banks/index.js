import { Router } from 'express'
import programs from './programs'
import lookup from './lookup'
import create from './create'
import update from './update'
import apply from './apply'
import sales from './sales'
import list from './list'
import show from './show'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/lookup', lookup)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.patch('/:id/apply', apply)

router.get('/:bank_id/sales', sales)

router.use('/:bank_id/programs', programs)

export default router
