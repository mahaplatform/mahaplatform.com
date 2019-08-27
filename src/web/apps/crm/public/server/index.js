import { Router } from 'express'
import subscriptions from './subscriptions'

const router = new Router({ mergeParams: true })

router.use(subscriptions)

export default router
