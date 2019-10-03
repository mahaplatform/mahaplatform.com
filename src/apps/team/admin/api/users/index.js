import notifications from './notifications'
import finalize from './finalize'
import activate from './activate'
import { Router } from 'express'
import signout from './signout'
import disable from './disable'
import unblock from './unblock'
import enable from './enable'
import create from './create'
import update from './update'
import access from './access'
import reset from './reset'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.patch('/:id', update)

router.get('/:id/edit', edit)

router.get('/:id/access', access)

router.patch('/:id/activate', activate)

router.patch('/:id/enable', enable)

router.patch('/:id/disable', disable)

router.patch('/:id/reset', reset)

router.patch('/:id/signout', signout)

router.patch('/:id/unblock', unblock)

router.use('/:id/notifications', notifications)

router.patch('/import/:id/finalize', finalize)

export default router
