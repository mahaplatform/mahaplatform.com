import { Router } from 'express'
import create from './create'
import update from './update'
import list from './list'
import show from './show'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

export default router
