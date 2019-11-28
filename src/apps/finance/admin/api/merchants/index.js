import { Router } from 'express'
import lookup from './lookup'
import create from './create'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/lookup', lookup)

router.get('/:id', show)

export default router
