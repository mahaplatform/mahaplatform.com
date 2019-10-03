import { activity } from '../../../../../web/core/services/routes/activities'
import { createUserToken } from '../../../../../web/core/utils/user_tokens'
import moment from 'moment'

const passwordRoute = async (req, res, next) => {

  if(!req.body.password || !req.body.confirmation) return res.status(422).json({
    code: 422,
    message: 'Please enter and confirm your password'
  })

  if(req.body.password !== req.body.confirmation) return res.status(422).json({
    code: 422,
    message: 'Password do not match'
  })

  await req.user.save({
    password: req.body.password,
    locked_out_at: null,
    is_blocked: null,
    reset_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await req.user.load(['team.logo'], {
    transacting: req.trx
  })

  const token = createUserToken(req.user, 'user_id')

  await activity(req, {
    story: 'reset {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'password',
    object_type: null
  })

  res.status(200).respond({
    token,
    team: {
      id: req.user.related('team').get('id'),
      title: req.user.related('team').get('title'),
      subdomain: req.user.related('team').get('subdomain'),
      color: req.user.related('team').get('color'),
      logo: req.user.related('team').related('logo').get('path')
    }
  })

}

export default passwordRoute
