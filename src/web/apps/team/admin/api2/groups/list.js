import GroupSerializer from '../../../serializers/group_serializer'
import Group from '../../../../maha/models/group'

const listRoute = async (req, res) => {

  const groups = await Group.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['title'],
    searchParams: ['title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['id','title']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['users.photo'],
    transacting: req.trx
  })

  res.status(200).respond(groups, (group) => {
    return GroupSerializer(req, req.trx, group)
  })

}

export default listRoute
