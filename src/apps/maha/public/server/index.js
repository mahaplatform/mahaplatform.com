import { Router } from 'express'
import aws from './aws'
import email from './email'

const router = new Router({ mergeParams: true })

router.use('/aws', aws)

router.use(email)

export default router
