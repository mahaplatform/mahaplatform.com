import { Router } from 'express'
import forward from './forward'

const router = new Router({ mergeParams: true })

router.use('/f:email_code([a-z0-9]{10})', forward)

export default router
