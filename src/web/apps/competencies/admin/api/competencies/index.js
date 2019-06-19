import { Router } from 'express'
import resources from './resources'
import destroy from './destroy'
import create from './create'
import update from './update'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:competency_id/resources', resources)

export default router
