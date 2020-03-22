import GroupSerializer from '../../../serializers/group_serializer'
import Group from '../../../models/group'

const showRoute = async (req, res) => {

  const group = await Group.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['logo','owner'],
    transacting: req.trx
  })

  if(!group) return res.status(404).respond({
    code: 404,
    message: 'Unable to load group'
  })

  res.status(200).respond(group, GroupSerializer)

}

export default showRoute
