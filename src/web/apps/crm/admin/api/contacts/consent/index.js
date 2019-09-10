import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.delete('/', destroy)

export default router
