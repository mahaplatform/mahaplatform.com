import GroupSerializer from '../../../serializers/group_serializer'
import Group from '../../../models/group'

const listRoute = async (req, res) => {

  const groups = await Group.filterFetch({
    scope: qb => {
      qb.joinRaw('inner join news_groups_users on news_groups_users.news_group_id=news_groups.id and news_groups_users.user_id=?', req.user.get('id'))
      qb.where('team_id', req.team.get('id'))
      qb.orderBy('title', 'asc')
    },
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  res.status(200).respond(groups, GroupSerializer)

}

export default listRoute
