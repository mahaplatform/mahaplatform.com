import { whitelist } from '@core/services/routes/params'
import GroupSerializer from '@apps/news/serializers/group_serializer'
import { updateMembers } from '@apps/news/services/groups'
import Group from '@apps/news/models/group'

const updateRoute = async (req, res) => {

  const group = await Group.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!group) return res.status(404).respond({
    code: 404,
    message: 'Unable to load group'
  })

  await group.save({
    ...whitelist(req.body, ['logo_id','title'])
  },{
    transacting: req.trx
  })

  await updateMembers(req, {
    group,
    members: req.body.members
  })

  await res.status(200).respond(group, GroupSerializer)

}

export default updateRoute
