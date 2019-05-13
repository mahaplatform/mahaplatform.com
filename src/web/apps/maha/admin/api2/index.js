import security_questions from './security_questions'
import notifications from './notifications'
import attachments from './attachments'
import assignees from './assignees'
import activate from './activate'
import sessions from './sessions'
import { Router } from 'express'
import account from './account'
import devices from './devices'
import signout from './signout'
import session from './session'
import assets from './assets'
import users from './users'
import links from './links'
import stars from './stars'
import help from './help'

const router = new Router({ mergeParams: true })

router.use('/account', account)

router.use('/activate', activate)

router.use('/assets', assets)

router.use('/assignees', assignees)

router.use('/attachments', attachments)

router.use('/devices', devices)

router.use('/help', help)

router.use('/links', links)

router.use('/notifications', notifications)

router.use('/sessions', sessions)

router.use('/session', session)

router.use('/signout', signout)

router.use('/security_questions', security_questions)

router.use('/stars', stars)

router.use('/users', users)

export default router
