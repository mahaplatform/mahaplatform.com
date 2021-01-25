const Response = require('./response')
const Request = require('./request')
const status = require('./status')
const Bull = require('bull')

const queue = new Bull('twilio', 'redis://172.31.31.51:6379/2')


const handle = async (req, res) => {
}

exports.handler = async (event, context) => {

  const req = new Request(event)

  const res = new Response()

  await status(req, queue)

  res.status(200).type('text/plain').send(true)

  await handle(req, res)

  return res.render()

}
