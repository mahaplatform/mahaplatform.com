import { Router } from 'express'
import emails from './emails'

const router = new Router({ mergeParams: true })

router.use('/emails', emails)

export default router
