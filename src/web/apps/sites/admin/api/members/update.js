import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import MemberSerializer from '../../../serializers/member_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Member from '../../../models/member'

const updateRoute = async (req, res) => {

  const member = await Member.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!member) return req.status(404).respond({
    code: 404,
    message: 'Unable to load member'
  })

  await member.save(whitelist(req.body, ['first_name','last_name','email']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: member
  })

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}/members`,
    `/admin/sites/sites/${req.params.site_id}/members/${member.get('id')}`
  ])

  res.status(200).respond(member, (member) => {
    return MemberSerializer(req, member)
  })

}

export default updateRoute
