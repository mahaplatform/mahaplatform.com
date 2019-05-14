import security_questions from './security_questions'
import notifications from './notifications'
import attachments from './attachments'
import assignees from './assignees'
import comments from './comments'
import settings from './settings'
import sessions from './sessions'
import profiles from './profiles'
import { Router } from 'express'
import sources from './sources'
import account from './account'
import devices from './devices'
import session from './session'
import assets from './assets'
import search from './search'
import fields from './fields'
import users from './users'
import react from './react'
import links from './links'
import stars from './stars'
import help from './help'

const router = new Router({ mergeParams: true })

router.use('/:parent_type/:parent_id/fields', fields)

router.use('/:commentable_type/:commentable_id/comments', comments)

router.use('/:starrable_type/:starrable_id/star', stars)

router.use('/:reactable_type/:reactable_id/react/:type', react)

router.use('/account', account)

router.use('/apps', settings)

router.use('/assets', assets)

router.use('/assignees', assignees)

router.use('/attachments', attachments)

router.use('/devices', devices)

router.use('/help', help)

router.use('/links', links)

router.use('/notifications', notifications)

router.use('/profiles', profiles)

router.use('/search', search)

router.use('/sessions', sessions)

router.use('/session', session)

router.use('/security_questions', security_questions)

router.use('/sources', sources)

router.use('/users', users)

export default router
