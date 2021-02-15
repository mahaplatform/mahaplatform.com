import voice_status from './voice_status'
import sms_status from './sms_status'
import bodyParser from 'body-parser'
import { Router } from 'express'
import lambda from './lambda'
import twilio from './twilio'

const router = new Router({ mergeParams: true })

router.use(bodyParser.json({ limit: '5mb', type: '*/*' }))

router.use(twilio)

router.post('/voice/status', voice_status)

router.post('/sms/status', sms_status)

router.get('/:type', lambda)

router.post('/:type', lambda)

export default router
