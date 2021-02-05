import adobesign from './adobesign'
import qrcode from './qrcode/show'
import { Router } from 'express'
import email from './email'
import aws from './aws'

const router = new Router({ mergeParams: true })

router.use('/adobesign', adobesign)

router.use('/aws', aws)

router.get('/shortlinks/:code/qrcode', qrcode)

router.use(email)

export default router
