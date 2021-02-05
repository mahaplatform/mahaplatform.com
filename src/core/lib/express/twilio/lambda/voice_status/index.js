const Response = require('./response')
const Request = require('./request')
const status = require('./status')

exports.handler = async (event, context) => {

  const req = new Request(event)

  const res = new Response()

  await status(req, res)

  res.status(200).type('plain/text').send(true)

  return res.render()

}
