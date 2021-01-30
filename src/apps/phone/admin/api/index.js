import voicemails from './voicemails'
import { Router } from 'express'
import calls from './calls'

const router = new Router({ mergeParams: true })

router.use('/calls', calls)

router.use('/programs/:program_id/voicemails', voicemails)

export default router
