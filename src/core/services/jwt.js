import jwt from 'jsonwebtoken'

const TWO_WEEKS = 60 * 60 * 24 * 7 * 2

export const encode = (data, duration = TWO_WEEKS) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + duration
  return jwt.sign({ iat, exp, data }, process.env.SECRET)
}

export const decode = (token, options = {}) => {
  try {
    return jwt.verify(token, process.env.SECRET, options)
  } catch(e) {
    return {
      err: e.message
    }
  }
}
