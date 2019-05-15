import memberships from './memberships'
import accounts from './accounts'
import projects from './projects'
import { Router } from 'express'
import users from './users'

const router = new Router({ mergeParams: true })

router.use('/accounts', accounts)

router.use('/projects', projects)

router.use('/memberships', memberships)

router.use('/users/:user_id', users)

export default router
