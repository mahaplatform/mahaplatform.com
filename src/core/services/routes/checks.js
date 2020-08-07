import { decode } from '../jwt'

export const checkHost = (req) => {
  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers.host
  return `${protocol}://${host}` === process.env.WEB_HOST
}

export const checkToken = (token, code) => {
  if(!token) return false
  const matches = token.match(/Bearer (.*)/)
  if(!matches) return false
  const payload = decode(matches[1], {
    ignoreExpiration: true
  })
  if(payload.data.code !== code) return false
  return true
}
