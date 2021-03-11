import websites from './websites'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use(websites)

export default router
