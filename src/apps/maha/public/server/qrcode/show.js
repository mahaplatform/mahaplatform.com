import ShortLink from '@apps/maha/models/shortlink'
import QRCode from 'qrcode'

const showRoute = async (req, res) => {

  const shortlink = await ShortLink.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  if(!shortlink) return res.status(404).json({
    code: 404,
    message: 'Unable to load shortlink'
  })

  const qrcode = await QRCode.toString(shortlink.get('shortUrl'), {
    errorCorrectionLevel: 'M',
    version: 3,
    type: 'svg'
  })

  res.status(200).type('image/svg+xml').send(qrcode)

}

export default showRoute
