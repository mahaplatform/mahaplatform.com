import GroupSerializer from '../../../serializers/group_serializer'
import Group from '../../../../maha/models/group'

const showRoute = async (req, res) => {

  const group = await Group.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!group) return req.status(404).respond({
    code: 404,
    message: 'Unable to load group'
  })

  res.status(200).respond(group, (group) => {
    return GroupSerializer(req, req.trx, group)
  })

}

export default showRoute
