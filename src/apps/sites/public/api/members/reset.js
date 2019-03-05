import { BackframeError, Route, sendMail } from 'maha'
import Member from '../../../models/member'
import Email from '../../../models/email'
import Site from '../../../models/site'

const processor = async (req, trx, options) => {

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

  const email = await Email.where({
    site_id: site.get('id'),
    code: 'reset'
  }).fetch({ transacting: trx})

  // const token = createUserToken(member, 'activation_id')

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: member.get('rfc822'),
    subject: email.get('subject'),
    html: email.get('text')
  })

  return { foo: 'bar' }

}

const resetRoute = new Route({
  rules: {
    'email': ['required','email']
  },
  method: 'post',
  path: '/reset',
  processor
})

export default resetRoute
