import GroupSerializer from '../../../serializers/group_serializer'
import Group from '../../../../maha/models/group'

const listRoute = async (req, res) => {

  const groups = await Group.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    filterParams: ['title'],
    searchParams: ['title'],
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['id','title']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['leader.photo'],
    transacting: req.trx
  })

  res.status(200).respond(groups, GroupSerializer)

}

export default listRoute
