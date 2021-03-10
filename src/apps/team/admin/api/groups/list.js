import GroupSerializer from '@apps/team/serializers/group_serializer'
import Group from '@apps/maha/models/group'

const listRoute = async (req, res) => {

  const groups = await Group.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['id','title']
    },
    page: req.query.$page,
    withRelated: ['leader.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(groups, GroupSerializer)

}

export default listRoute
