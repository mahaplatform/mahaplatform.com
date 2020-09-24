import { Router } from 'express'
import unblock from './unblock'
import signout from './signout'
import reset from './reset'
import teams from './teams'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.patch('/:id/reset', reset)

router.patch('/:id/signout', signout)

router.patch('/:id/unblock', unblock)

router.use('/:account_id/teams', teams)

export default router
