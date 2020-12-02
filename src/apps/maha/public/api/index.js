import agreements from './agreements'
import { Router } from 'express'
import forward from './forward'

const router = new Router({ mergeParams: true })

router.use('/agreements', agreements)

router.use('/forward', forward)

export default router
