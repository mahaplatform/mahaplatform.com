import { createUserToken } from '../../../../../core/utils/user_tokens'
import { BackframeError, Route } from '../../../../../core/backframe'
import Member from '../../../models/member'
import Site from '../../../models/site'

const processor = async (req, trx, options) => {

  if(!req.body.email) {
    throw new BackframeError({
      code: 422,
      message: 'Please enter an email'
    })
  }

  if(!req.body.password) {
    throw new BackframeError({
      code: 422,
      message: 'Please enter an password'
    })
  }

  const site = await Site.where({
    id: req.params.site_id
  }).fetch({ transacting: trx })

  if(!site) {
    throw new BackframeError({
      code: 422,
      message: 'Invalid site'
    })
  }

  const member = await Member.where({
    site_id: site.get('id'),
    email: req.body.email
  }).fetch({ transacting: trx })

  if(!member) {
    throw new BackframeError({
      code: 422,
      message: 'Cannot find member'
    })
  }

  if(!member.authenticate(req.body.password)) {
    throw new BackframeError({
      code: 422,
      message: 'Invalid password'
    })
  }

  const token = createUserToken(member, 'member_id')

  return {
    first_name: member.get('first_name'),
    last_name: member.get('last_name'),
    email: member.get('email'),
    token,
    ...member.get('values')
  }

}

const signinRoute = new Route({
  method: 'post',
  path: '/signin',
  processor
})

export default signinRoute
