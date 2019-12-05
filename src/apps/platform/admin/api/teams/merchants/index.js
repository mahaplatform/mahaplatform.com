import { Router } from 'express'
import lookup from './lookup'
import update from './update'
import list from './list'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.get('/lookup', lookup)

router.get('/', list)

router.get('/:id/edit', edit)

router.patch('/:id', update)

export default router
