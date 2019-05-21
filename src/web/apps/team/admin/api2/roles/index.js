import { Router } from 'express'
import create from './create'
import update from './update'
import access from './access'
import users from './users'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.get('/:id/access', access)

router.use('/:id/users', users)

export default router
