import { Router } from 'express'
import qrcode from './qrcode/show'
import email from './email'
import aws from './aws'

const router = new Router({ mergeParams: true })

router.use('/aws', aws)

router.use('/shortlinks/:code/qrcode', qrcode)

router.use(email)

export default router
