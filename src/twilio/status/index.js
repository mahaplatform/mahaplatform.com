const Response = require('./response')
const Request = require('./request')
const status = require('./status')

exports.handler = async (event, context) => {

  const req = new Request(event)

  const res = new Response()

  await status(req)

  res.status(200).type('text/plain').send(true)

  return res.render()

}
