import GroupSerializer from '@apps/news/serializers/group_serializer'
import Group from '@apps/news/models/group'

const editRoute = async (req, res) => {

  const group = await Group.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['logo','members','owner'],
    transacting: req.trx
  })

  if(!group) return res.status(404).respond({
    code: 404,
    message: 'Unable to load group'
  })

  await res.status(200).respond(group, (req, group) => ({
    id: group.get('id'),
    title: group.get('title'),
    logo_id: group.get('logo_id'),
    members: group.related('members').map(member => ({
      id: member.get('id'),
      grouping_id: member.get('grouping_id'),
      user_id: member.get('user_id'),
      group_id: member.get('group_id')
    }))
  }))

  await res.status(200).respond(group, GroupSerializer)

}
export default editRoute
