import workflows from './workflows'
import emails from './emails'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/emails', emails)

router.use('/workflows', workflows)

export default router
