import { Router } from 'express'
import status from './status'
import voice from './voice'
import call from './call'
import sms from './sms'

const router = new Router({ mergeParams: true })

router.post('/call', call)

router.post('/sms', sms)

router.post('/status', status)

router.post('/voice', voice)

export default router
