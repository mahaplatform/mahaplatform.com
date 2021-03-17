import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.patch('/', update)

router.delete('/', destroy)

export default router
