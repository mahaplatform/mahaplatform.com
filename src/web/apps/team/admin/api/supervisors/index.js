import available from './available'
import { Router } from 'express'
import create from './create'
import users from './users'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/available', available)

router.get('/:id', show)

router.use('/:id/users', users)

export default router
