import { Router } from 'express'
import create from './create'
import smses from './smses'
import list from './list'
import show from './show'
import read from './read'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.patch('/:id/read', read)

router.get('/:id/smses', smses)

router.get('/:id', show)

router.post('/:id', create)

export default router
