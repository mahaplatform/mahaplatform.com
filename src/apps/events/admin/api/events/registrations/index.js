import { Router } from 'express'
import tickets from './tickets'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/tickets', tickets)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
