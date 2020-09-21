import { Router } from 'express'
import signout from './signout'
import reset from './reset'
import teams from './teams'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.get('/:id/teams', teams)

router.patch('/:id/reset', reset)

router.patch('/:id/signout', signout)

export default router
