import { Router } from 'express'
import emails from './emails'
import smses from './smses'
import calls from './calls'

const router = new Router({ mergeParams: true })

router.use('/email', emails)

router.use('/sms', smses)

router.use('/voice', calls)

export default router
