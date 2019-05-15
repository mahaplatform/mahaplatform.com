import memberships from './memberships'
import accounts from './accounts'
import projects from './projects'
import statuses from './statuses'
import { Router } from 'express'
import batches from './batches'
import rates from './rates'
import users from './users'

const router = new Router({ mergeParams: true })

router.use('/accounts', accounts)

router.use('/batches', batches)

router.use('/memberships', memberships)

router.use('/projects', projects)

router.use('/rates', rates)

router.use('/statuses', statuses)

router.use('/users/:user_id', users)

export default router
