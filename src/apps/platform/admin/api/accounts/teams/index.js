import { Router } from 'express'
import available from './available'
import create from './create'
import roles from './roles'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/available', available)

router.get('/:id/roles', roles)


export default router
