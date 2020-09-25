import activate from './activate'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import roles from './roles'
import users from './users'
import banks from './banks'
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

router.patch('/:id/activate', activate)

router.get('/:id/apps', apps)

router.get('/:id/roles', roles)

router.post('/:id/users', users)

router.use('/:team_id/banks', banks)

export default router
