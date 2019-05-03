import { Route } from '../../../../../core/backframe'
import _ from 'lodash'

const activity = (req, trx, object, options) => ({
  story: 'changed {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'password',
  object_type: null
})

const processor = async (req, trx, options) => {

  const data = _.pick(req.body, ['password'])

  await req.user.save(data, { patch: true, transacting: trx })

  return true

}

const rules = (req, trx, options) => ({
  password: 'required',
  confirmation: ['required', 'matchesField:password']
})

const passwordRoute = new Route({
  activity,
  method: 'patch',
  path: '/password',
  processor,
  rules
})

export default passwordRoute
