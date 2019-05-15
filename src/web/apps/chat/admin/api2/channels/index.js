import { Router } from 'express'
import archive from './archive'
import destroy from './destroy'
import update from './update'
import create from './create'
import leave from './leave'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.patch('/:id/leave', leave)

router.patch('/:id/archive', archive)

export default router
