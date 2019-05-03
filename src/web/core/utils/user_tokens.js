import * as jwt from '../services/jwt'
import User from '../../apps/maha/models/user'
import { BackframeError } from '../backframe'

const TWO_WEEKS = 60 * 60 * 24 * 7 * 2

export const createUserToken = (user, key, data = {}) => {

  return jwt.encode({
    [key]: user.get('id'),
    ...data
  }, TWO_WEEKS)

}

export const loadUserFromToken = async (key, token, trx) => {

  const { data, iat } = await _decode(token)

  const id = data[key]

  if(!id) {
    throw new BackframeError({
      code: 401,
      message: 'Invalid token'
    })
  }

  const user = await User.where({ id }).fetch({ transacting: trx })

  if(!user) {
    throw new BackframeError({
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
      throw new BackframeError({
        code: 401,
         message: 'Expired token'
       })
    }

    throw new BackframeError({
      code: 401,
      message: 'Invalid token'
    })

  }

}
