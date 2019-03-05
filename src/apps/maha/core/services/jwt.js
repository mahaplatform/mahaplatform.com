import jwt from 'jsonwebtoken'

export const encode = (data, duration) => {

  const iat = Math.floor(Date.now() / 1000)

  const exp = iat + duration

  return jwt.sign({ iat, exp, data }, process.env.SECRET)

}

export const decode = (token) => {

  return jwt.verify(token, process.env.SECRET)

}