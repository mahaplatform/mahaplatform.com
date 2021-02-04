import voicemails from './voicemails'
import phone_numbers from './phone_numbers'
import { Router } from 'express'
import calls from './calls'

const router = new Router({ mergeParams: true })

router.use('/calls', calls)

router.use('/phone_numbers', phone_numbers)

router.use('/programs/:program_id/voicemails', voicemails)

export default router
