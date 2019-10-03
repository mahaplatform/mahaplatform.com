import { validate } from '../../../../../web/core/utils/validation'
import User from '../../../models/user'

const emailRoute = async (req, res) => {

  await validate({
    team_id: 'required'
  }, req.body)

  if(!req.body.email) return res.status(422).json({
    code: 422,
    message: 'Please enter your email'
  })

  const user = await User.where({
    team_id: req.body.team_id,
    email: req.body.email
  }).fetch({
    withRelated: ['photo', 'team.logo'],
    transacting: req.trx
  })

  if(!user) return res.status(404).json({
    code: 404,
    message: 'Unable to find this user'
  })

  if(!user.get('activated_at')) return res.status(422).json({
    code: 422,
    message: 'Your account has not been activated'
  })

  if(!user.get('is_active')) return res.status(422).json({
    code: 422,
    message: 'Your account has been disabled'
  })

  res.status(200).respond({
    team: {
      id: user.related('team').get('id'),
      title: user.related('team').get('title'),
      subdomain: user.related('team').get('subdomain'),
      color: user.related('team').get('color'),
      logo: user.related('team').related('logo').get('path')
    },
    user: {
      id: user.get('id'),
      full_name: user.get('full_name'),
      initials: user.get('initials'),
      email: user.get('email'),
      photo: user.related('photo') ? user.related('photo').get('path') : null,
      is_blocked: user.get('is_blocked'),
      locked_out_at: user.get('locked_out_at')
    }
  })

}

export default emailRoute
