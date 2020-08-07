import { decode } from '../jwt'

const ignoreExpiration = true

export const checkToken = (token, code) => {
  if(!token) return false
  const matches = token.match(/Bearer (.*)/)
  if(!matches) return false
  const payload = decode(matches[1], { ignoreExpiration })
  if(payload.data.code !== code) return false
  return true
}
