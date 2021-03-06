const { next } = require('./utils')

const message = (req, res, twiml) => {

  const { assets, message } = req.step

  const msg = twiml.message({
    action: `${process.env.TWILIO_HOST_STATUS}/sms-status`
  })

  msg.body(message)

  if(assets) {
    assets.map(asset => {
      msg.media(`${process.env.ASSET_HOST}/imagecache/w=350/${asset.key}`)
    })
  }

  console.log(twiml.toString())

  next(req, res, twiml)

  return {
    verb: 'message',
    message,
    assets
  }

}

module.exports = message
