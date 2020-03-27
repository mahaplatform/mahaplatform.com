import { Router } from 'express'
import QRCode from 'qrcode'

const router = new Router({ mergeParams: true })

router.get('/:code', async (req, res) => {

  const data = await QRCode.toString(req.params.code, {
    errorCorrectionLevel: 'H',
    version: 2,
    type: 'svg'
  })

  res.status(200).type('image/svg+xml').send(data)

})


export default router
