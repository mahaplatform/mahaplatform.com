import { Router } from 'express'
import voice from './voice'
import email from './email'
import sms from './sms'

const router = new Router({ mergeParams: true })

router.use('/email', email)

router.use('/sms', sms)

router.use('/voice', voice)

export default router
