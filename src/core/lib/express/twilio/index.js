import { Router } from 'express'
import voice from './voice'
import call from './call'
import sms from './sms'

const router = new Router({ mergeParams: true })

router.use('/call', call)

router.use('/sms', sms)

router.use('/voice', voice)

export default router
