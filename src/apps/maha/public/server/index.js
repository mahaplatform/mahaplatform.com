import { Router } from 'express'
import email from './email'

const router = new Router({ mergeParams: true })

router.use(email)

export default router
