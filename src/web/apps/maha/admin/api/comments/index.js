import { Router } from 'express'
import create from './create'
import destroy from './destroy'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.delete('/:id', destroy)

export default router
