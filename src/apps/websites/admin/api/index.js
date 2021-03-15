import { Router } from 'express'
import websites from './websites'
import domains from './domains'

const router = new Router({ mergeParams: true })

router.use('/domains', domains)

router.use('/websites', websites)

export default router
