import { Router } from 'express'
import email from './email'
import sms from './sms'
import voice from './voice'

const router = new Router({ mergeParams: true })

router.use('/email', email)

router.use('/sms', sms)

router.use('/voice', voice)

export default router
