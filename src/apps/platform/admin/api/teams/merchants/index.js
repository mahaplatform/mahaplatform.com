import { Router } from 'express'
import lookup from './lookup'
import create from './create'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/lookup', lookup)

router.get('/', list)

router.post('/', create)

export default router
