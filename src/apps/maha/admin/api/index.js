import security_questions from './security_questions'
import phone_numbers from './phone_numbers'
import notifications from './notifications'
import attachments from './attachments'
import shortlinks from './shortlinks'
import assignees from './assignees'
import dashboard from './dashboard'
import comments from './comments'
import sessions from './sessions'
import profiles from './profiles'
import settings from './settings'
import { Router } from 'express'
import filters from './filters'
import imports from './imports'
import sources from './sources'
import account from './account'
import devices from './devices'
import session from './session'
import aliases from './aliases'
import assets from './assets'
import search from './search'
import fields from './fields'
import audits from './audits'
import states from './states'
import emails from './emails'
import users from './users'
import react from './react'
import links from './links'
import stars from './stars'
import help from './help'

const router = new Router({ mergeParams: true })

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.use('/account', account)

router.use('/aliases', aliases)

router.use('/apps', settings)

router.use('/assets', assets)

router.use('/assignees', assignees)

router.use('/dashboard', dashboard)

router.use('/devices', devices)

router.use('/emails', emails)

router.use('/help', help)

router.use('/imports', imports)

router.use('/links', links)

router.use('/notifications', notifications)

router.use('/phone_numbers', phone_numbers)

router.use('/profiles', profiles)

router.use('/search', search)

router.use('/sessions', sessions)

router.use('/session', session)

router.use('/security_questions', security_questions)

router.use('/shortlinks', shortlinks)

router.use('/states', states)

router.use('/sources', sources)

router.use('/users', users)

router.use('/:code/filters', filters)

router.use('/:parent_type/fields', fields)

router.use('/:parent_type/:parent_id/fields', fields)

router.use('/:commentable_type/:commentable_id/comments', comments)

router.use('/:starrable_type/:starrable_id/star', stars)

router.use('/:attachable_type/:attachable_id/attachments', attachments)

router.use('/:auditable_type/:auditable_id/audits', audits)

router.use('/:reactable_type/:reactable_id/react/:type', react)

export default router
