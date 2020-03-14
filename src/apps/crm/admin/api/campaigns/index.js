import { Router } from 'express'
import social from './social'
import postal from './postal'
import voice from './voice'
import email from './email'
import sms from './sms'

const router = new Router({ mergeParams: true })

router.use('/email', email)

router.use('/postal', postal)

router.use('/social', social)

router.use('/sms', sms)

router.use('/voice', voice)

export default router
