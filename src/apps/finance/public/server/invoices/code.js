import Invoice from '@apps/finance/models/invoice'
import QRCode from 'qrcode'

const codeRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  if(!invoice) return res.status(404).json({
    code: 404,
    message: 'Unable to load invoice'
  })

  const qrcode = await QRCode.toString(invoice.get('url'), {
    errorCorrectionLevel: 'M',
    version: 4,
    type: 'svg'
  })

  res.status(200).type('image/svg+xml').send(qrcode)

}

export default codeRoute
