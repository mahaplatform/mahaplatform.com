import { Router } from 'express'
import lookup from './lookup'
import update from './update'
import list from './list'
import edit from './edit'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/lookup', lookup)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

export default router
