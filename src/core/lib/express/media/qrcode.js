import QRCode from 'qrcode'

const qrcode = async (req, res) => {

  const data = await QRCode.toString(req.params.code, {
    errorCorrectionLevel: 'H',
    version: 2,
    type: 'svg'
  })

  res.status(200).type('image/svg+xml').send(data)

}

export default qrcode
