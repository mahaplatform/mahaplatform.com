import collectObjects from '../../../../utils/collect_objects'
import feedback from './feedback'
import { Router } from 'express'
import receive from './receive'

const voiceFiles = collectObjects('hooks/voice/index.js')

const router = new Router({ mergeParams: true })

router.post('/feedback', feedback)

router.post('/', receive)


export default router
