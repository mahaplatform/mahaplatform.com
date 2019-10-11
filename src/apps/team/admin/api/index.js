import device_values from './device_values'
import supervisors from './supervisors'
import activities from './activities'
import user_types from './user_types'
import sessions from './sessions'
import settings from './settings'
import { Router } from 'express'
import numbers from './numbers'
import groups from './groups'
import access from './access'
import emails from './emails'
import roles from './roles'
import users from './users'
import apps from './apps'

const router = new Router({ mergeParams: true })

router.use('/access', access)

router.use('/activities', activities)

router.use('/apps', apps)

router.use('/device_values', device_values)

router.use('/emails', emails)

router.use('/groups', groups)

router.use('/numbers', numbers)

router.use('/roles', roles)

router.use('/sessions', sessions)

router.use('/settings', settings)

router.use('/supervisors', supervisors)

router.use('/user_types', user_types)

router.use('/users', users)

export default router
