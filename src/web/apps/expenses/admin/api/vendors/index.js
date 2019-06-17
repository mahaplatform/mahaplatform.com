import { Router } from 'express'
import create from './create'
import update from './update'
import merge from './merge'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.patch('/:id/merge', merge)

export default router
