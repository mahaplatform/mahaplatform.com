import PostSerializer from '../../../serializers/post_serializer'
import Post from '../../../models/post'

const listRoute = async (req, res) => {

  const posts = await Post.filterFetch({
    scope: qb => {
      qb.select(req.trx.raw('distinct on (news_posts.id, news_posts.created_at) news_posts.*'))
      qb.joinRaw('left join news_groups_users on news_groups_users.news_group_id=news_posts.group_id')
      qb.joinRaw('left join news_groups on news_groups.id=news_groups_users.news_group_id')
      qb.whereRaw('(news_groups_users.news_group_id is null or news_groups_users.user_id=? or news_groups.owner_id=?)', [req.user.get('id'), req.user.get('id')])
      qb.whereNull('news_posts.deleted_at')
      qb.where('news_posts.team_id', req.team.get('id'))
      qb.orderBy('news_posts.created_at', 'desc')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['group_id']
    },
    page: req.query.$page,
    withRelated: ['group','attachments.asset.source','user.photo','likes','comments.user.photo','comments.attachments.asset.source','comments.reactions.user.photo','comments.quoted_comment.user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(posts, PostSerializer)

}

export default listRoute
