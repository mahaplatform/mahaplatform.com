import banks from './banks'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import roles from './roles'
import users from './users'
import list from './list'
import edit from './edit'
import show from './show'
import apps from './apps'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.get('/:id/edit', edit)

router.get('/:id/apps', apps)

router.get('/:id/roles', roles)

router.post('/:id/users', users)

router.use('/:team_id/banks', banks)

export default router
