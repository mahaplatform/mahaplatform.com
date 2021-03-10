import GroupSerializer from '@apps/news/serializers/group_serializer'
import Group from '@apps/news/models/group'

const listRoute = async (req, res) => {

  const groups = await Group.filterFetch({
    scope: qb => {
      qb.joinRaw('left join news_groups_users on news_groups_users.news_group_id=news_groups.id and news_groups_users.user_id=?', req.user.get('id'))
      qb.whereRaw('(news_groups_users.news_group_id is not null or news_groups.owner_id=?)', req.user.get('id'))
      qb.where('team_id', req.team.get('id'))
      qb.orderBy('title', 'asc')
    },
    filter: {
      params: req.query.$filter,
      search: ['title']
    },
    page: req.query.$page,
    withRelated: ['logo'],
    transacting: req.trx
  })

  await res.status(200).respond(groups, GroupSerializer)

}

export default listRoute
