import MemberSerializer from '../../../serializers/member_serializer'
import { Route, createUserToken, processValues, sendMail } from 'maha'
import Member from '../../../models/member'
import Email from '../../../models/email'

const sendActivationEmail = async (req, trx, member, options) => {

  const email = await Email.where({
    site_id: req.params.site_id,
    code: 'activation'
  }).fetch({ transacting: trx})

  const token = createUserToken(member, 'activation_id')

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: member.get('rfc822'),
    subject: email.get('subject'),
    html: email.get('text')
  })

}

const processor = async (req, trx, options) => {

  const values = await processValues('sites_sites', req.params.site_id, req.body.values, trx)

  const member = await Member.forge({
    team_id: req.team.get('id'),
    site_id: req.params.site_id,
    values,
    password: 'test',
    is_active: true
  }).save(null, { transacting: trx})

  return member

}

const refresh = (req, trx, result, options) => [
  `/admin/sites/sites/${req.params.site_id}/members`,
  `/admin/sites/sites/${req.params.site_id}/members/${result.get('id')}`
]

const createRoute = new Route({
  afterProcessor: [
    sendActivationEmail
  ],
  method: 'post',
  path: '',
  processor,
  refresh,
  serializer: MemberSerializer
})

export default createRoute
