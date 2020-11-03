import workflows from './workflows'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/workflows', workflows)

export default router
