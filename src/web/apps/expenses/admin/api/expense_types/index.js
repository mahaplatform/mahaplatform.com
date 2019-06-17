import { Router } from 'express'
import create from './create'
import update from './update'
import active from './active'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/active', active)

router.get('/:id', show)

router.patch('/:id', update)

export default router
