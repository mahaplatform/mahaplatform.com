import { Route, BackframeError } from '../../../server'

const activity = (req, trx, object, options) => ({
  story: 'changed {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'photo',
  object_type: null
})

const processor = async (req, trx, options) => {

  try {

    req.user = await req.user.save({
      photo_id: req.body.photo_id
    }, {
      patch: true,
      transacting: trx
    })

    return {
      photo_id: req.user.get('photo_id')
    }

  } catch(err) {

    throw new BackframeError({
      code: 422,
      message: 'Unable to save account',
      errors: err.toJSON()
    })

  }

}

const messages = (req, trx, result, options) => ({
  channel: 'user',
  action: 'session'
})

const photoRoute = new Route({
  activity,
  messages,
  method: 'patch',
  path: '/photo',
  processor
})

export default photoRoute
