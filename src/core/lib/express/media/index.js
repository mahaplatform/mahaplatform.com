import imagefilter from './imagefilter'
import imagecache from './imagecache'
import { Router } from 'express'
import qrcode from './qrcode'

const router = new Router({ mergeParams: true })

router.get('/imagefilter/*', imagefilter)

router.get('/imagecache/*', imagecache)

router.get('/qrcode/:code', qrcode)

export default router
