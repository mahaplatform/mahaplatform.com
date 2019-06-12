import { activity } from '../../../../../core/services/routes/activities'
import { createUserToken } from '../../../../../core/utils/user_tokens'
import MemberSerializer from '../../../serializers/member_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { processValues } from '../../../../maha/services/values'
import { sendMail } from '../../../../../core/services/email'
import Member from '../../../models/member'
import Email from '../../../models/email'

const createRoute = async (req, res) => {

  const values = await processValues('sites_sites', req.params.site_id, req.body.values, req.trx)

  const member = await Member.forge({
    team_id: req.team.get('id'),
    site_id: req.params.site_id,
    values,
    password: 'test',
    is_active: true
  }).save(null, {
    transacting: req.trx
  })

  const email = await Email.where({
    site_id: req.params.site_id,
    code: 'activation'
  }).fetch({
    transacting: req.trx
  })

  const token = createUserToken(member, 'activation_id')

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: member.get('rfc822'),
    subject: email.get('subject'),
    html: email.get('text')
  })

  await activity(req, {
    story: 'created {object}',
    object: member
  })

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}/members`,
    `/admin/sites/sites/${req.params.site_id}/members/${member.get('id')}`
  ])

  res.status(200).respond(member, (member) => {
    return MemberSerializer(req, req.trx, member)
  })

}

export default createRoute
