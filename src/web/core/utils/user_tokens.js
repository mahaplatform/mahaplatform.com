import * as jwt from '../services/jwt'
import User from '../../../apps/maha/models/user'

const TWO_WEEKS = 60 * 60 * 24 * 7 * 2

export const createUserToken = (user, key, data = {}) => {

  return jwt.encode({
    [key]: user.get('id'),
    ...data
  }, TWO_WEEKS)

}

export const loadUserFromToken = async (key, token, trx) => {

  const { data, iat } = await _decode(token)

  if(!data[key]) {
    throw new Error({
      code: 401,
      message: 'Invalid token'
    })
  }

  const user = await User.query(qb => {
    qb.where('id', data[key])
  }).fetch({
    transacting: trx
  })

  if(!user) {
    throw new Error({
      code: 404,
      message: 'Unable to load user'
    })
  }

  return {
    ...data,
    user,
    iat
  }

}

const _decode = (token) => {

  try {

    return jwt.decode(token)

  } catch(err) {

    if(err.name === 'TokenExpiredError') {
      throw new Error({
        code: 401,
        message: 'Expired token'
      })
    }

    throw new Error({
      code: 401,
      message: 'Invalid token'
    })

  }

}
