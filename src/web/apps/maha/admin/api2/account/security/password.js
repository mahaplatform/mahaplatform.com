import { activity } from '../../../../../../core/services/routes/activities'
import { message } from '../../../../../../core/services/routes/emitter'
import Checkit from 'checkit'
import _ from 'lodash'

const passwordRoute = async (req, res) => {

  await Checkit({
    password: 'required',
    confirmation: ['required', 'matchesField:password']
  }).run(req.body)

  const data = _.pick(req.body, ['password'])

  await req.user.save(data, {
    patch: true,
    transacting: req.trx
  })

  await message(req, {
    channel: 'user',
    action: 'session'
  })

  await activity(req, {
    story: 'changed {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'password',
    object_type: null
  })

  res.status(200).respond({})

}

export default passwordRoute
