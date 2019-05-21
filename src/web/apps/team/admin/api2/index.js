import supervisors from './supervisors'
import { Router } from 'express'
import groups from './groups'
import roles from './roles'
import users from './users'

const router = new Router({ mergeParams: true })

router.use('/groups', groups)

router.use('/roles', roles)

router.use('/supervisors', supervisors)

router.use('/users', users)

export default router
