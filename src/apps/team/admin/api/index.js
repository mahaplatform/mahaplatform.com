import phone_numbers from './phone_numbers'
import device_values from './device_values'
import supervisors from './supervisors'
import activities from './activities'
import sessions from './sessions'
import settings from './settings'
import { Router } from 'express'
import groups from './groups'
import access from './access'
import emails from './emails'
import faxes from './faxes'
import roles from './roles'
import users from './users'
import calls from './calls'
import smses from './smses'
import apps from './apps'

const router = new Router({ mergeParams: true })

router.use('/access', access)

router.use('/activities', activities)

router.use('/apps', apps)

router.use('/calls', calls)

router.use('/device_values', device_values)

router.use('/emails', emails)

router.use('/faxes', faxes)

router.use('/groups', groups)

router.use('/phone_numbers', phone_numbers)

router.use('/roles', roles)

router.use('/sessions', sessions)

router.use('/settings', settings)

router.use('/smses', smses)

router.use('/supervisors', supervisors)

router.use('/users', users)

export default router
