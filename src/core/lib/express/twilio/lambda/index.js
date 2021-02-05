import voice_status from './voice_status'
import sms_status from './sms_status'
import voice from './voice'
import call from './call'
import sms from './sms'
import Url from 'url'

const getHandler = (type) => {
  if(type === 'voice_status') return voice_status
  if(type === 'sms_status') return sms_status
  if(type === 'voice') return voice
  if(type === 'call') return call
  if(type === 'sms') return sms
}

const lambdaRoute = async (req, res) => {

  const url = Url.parse(req.originalUrl)

  const { handler } = getHandler(req.params.type)

  const { body, headers, statusCode } = await handler({
    cookies: req.cookies,
    body: req.body,
    rawQueryString: url.query,
    isBase64Encoded: false
  })

  res.set(headers)

  res.status(statusCode).send(body)

}

export default lambdaRoute
