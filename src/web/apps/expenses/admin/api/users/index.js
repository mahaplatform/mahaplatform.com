import memberships from './memberships'
import projects from './projects'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/projects', projects)

router.use('/memberships', memberships)

export default router
