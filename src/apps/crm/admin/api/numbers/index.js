import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import lookup from './lookup'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/lookup', lookup)

router.delete('/:id', destroy)

export default router
