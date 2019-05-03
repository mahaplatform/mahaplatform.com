import { Route, BackframeError } from '../../../../../core/backframe'

const activity = (req, trx, result, options) => ({
  story: 'updated {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'account',
  object_type: null
})

const processor = async (req, trx, options) => {

  try {

    req.user = await req.user.save({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      secondary_email: req.body.secondary_email
    }, {
      patch: true,
      transacting: trx
    })

    return {
      first_name: req.user.get('first_name'),
      last_name: req.user.get('last_name'),
      email: req.user.get('email'),
      secondary_email: req.user.get('secondary_email')
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

const updateRoute = new Route({
  activity,
  messages,
  method: 'patch',
  path: '',
  processor
})

export default updateRoute
