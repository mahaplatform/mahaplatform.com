import memberships from './memberships'
import accounts from './accounts'
import projects from './projects'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/accounts', accounts)

router.use('/projects', projects)

router.use('/memberships', memberships)

export default router
