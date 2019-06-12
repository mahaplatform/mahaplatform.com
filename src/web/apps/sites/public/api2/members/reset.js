import { sendMail } from '../../../../../core/services/email'
import Member from '../../../models/member'
import Email from '../../../models/email'
import Site from '../../../models/site'
import Checkit from 'checkit'

const resetRoute = async (req, res) => {

  await Checkit({
    email: ['required','email']
  }).run(req.body)

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
    code: 404,
    message: 'Unable to load member'
  })

  const email = await Email.where({
    site_id: site.get('id'),
    code: 'reset'
  }).fetch({
    transacting: req.trx
  })

  // const token = createUserToken(member, 'activation_id')

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: member.get('rfc822'),
    subject: email.get('subject'),
    html: email.get('text')
  })

  res.status(200).respond(true)

}

export default resetRoute
