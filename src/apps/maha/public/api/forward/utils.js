import { decode } from '../../../../../core/services/jwt'

export const checkToken = (token, code) => {
  if(!token) return false
  const matches = token.match(/Bearer (.*)/)
  if(!matches) return false
  const payload = decode(matches[1])
  if(payload.data.code !== code) return false
  return true
}
