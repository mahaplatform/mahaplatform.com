import { createUserToken } from '../../../../../core/utils/user_tokens'
import Member from '../../../models/member'
import Site from '../../../models/site'

const signinRoute = async (req, res) => {

  if(!req.body.email) return req.status(404).respond({
    code: 422,
    message: 'Please enter an email'
  })

  if(!req.body.password) return req.status(404).respond({
    code: 422,
    message: 'Please enter a password'
  })

  const site = await Site.where({
    id: req.params.site_id
  }).fetch({
    transacting: req.trx
  })

  if(!site) return req.status(404).respond({
    code: 404,
    message: 'Unable to load site'
  })

  const member = await Member.where({
    site_id: site.get('id'),
    email: req.body.email
  }).fetch({
    transacting: req.trx
  })

  if(!member) return req.status(404).respond({
    code: 422,
    message: 'Unable to load member'
  })

  if(!member.authenticate(req.body.password)) return req.status(404).respond({
    code: 422,
    message: 'Invalid password'
  })

  const token = createUserToken(member, 'member_id')

  res.status(200).respond({
    first_name: member.get('first_name'),
    last_name: member.get('last_name'),
    email: member.get('email'),
    token,
    ...member.get('values')
  })

}

export default signinRoute
