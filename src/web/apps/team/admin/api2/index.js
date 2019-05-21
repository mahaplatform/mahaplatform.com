import supervisors from './supervisors'
import { Router } from 'express'
import users from './users'

const router = new Router({ mergeParams: true })

router.use('/supervisors', supervisors)

router.use('/users', users)

export default router
