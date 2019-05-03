import { BackframeError, Route } from '../../../../../core/backframe'
import User from '../../../models/user'

const processor = async (req, trx, options) => {

  if(!req.body.email) {
    throw new BackframeError({
      code: 422,
      message: 'Please enter your email'
    })
  }

  const user = await User.where({
    team_id: req.body.team_id,
    email: req.body.email
  }).fetch({
    withRelated: ['photo', 'team.logo', 'team.strategies'],
    transacting: trx
  })

  if(!user) {
    throw new BackframeError({
      code: 422,
      message: 'Unable to find this user'
    })
  }

  if(!user.get('activated_at')) {
    throw new BackframeError({
      code: 422,
      message: 'Your account has not been activated'
    })
  }

  if(!user.get('is_active')) {
    throw new BackframeError({
      code: 422,
      message: 'Your account has been disabled'
    })
  }

  const team = user.related('team')

  return {
    team: {
      id: team.get('id'),
      title: team.get('title'),
      subdomain: team.get('subdomain'),
      color: team.get('color'),
      logo: team.related('logo').get('path'),
      strategies: team.related('strategies').map(strategy => {
        strategy.get('name')
      })
    },
    user: {
      id: user.get('id'),
      full_name: user.get('full_name'),
      initials: user.get('initials'),
      email: user.get('email'),
      photo: user.related('photo').get('path'),
      is_blocked: user.get('is_blocked'),
      locked_out_at: user.get('locked_out_at')
    }
  }

}

const rules = {
  team_id: 'required'
}

const emailRoute = new Route({
  path: '/email',
  method: 'post',
  processor,
  rules
})

export default emailRoute
