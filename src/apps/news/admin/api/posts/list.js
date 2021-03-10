import PostSerializer from '@apps/news/serializers/post_serializer'
import Post from '@apps/news/models/post'

const listRoute = async (req, res) => {

  const posts = await Post.filterFetch({
    scope: qb => {
      qb.select(req.trx.raw('distinct on (news_posts.id, news_posts.created_at) news_posts.*'))
      qb.joinRaw('left join news_groups_users on news_groups_users.news_group_id=news_posts.group_id')
      qb.joinRaw('left join news_groups on news_groups.id=news_groups_users.news_group_id')
      if(req.params.group_id) qb.where('news_posts.group_id', req.params.group_id)
      if(req.params.user_id) qb.whereRaw('(news_posts.user_id=? or news_posts.target_user_id=?)', [req.params.user_id, req.params.user_id])
      qb.whereRaw('(news_posts.user_id=? or target_user_id=? or (news_groups_users.user_id=? or owner_id=?) or (target_user_id is null and news_group_id is null))', [req.user.get('id'), req.user.get('id'), req.user.get('id'), req.user.get('id')])
      qb.whereNull('deleted_at')
      qb.where('news_posts.team_id', req.team.get('id'))
      qb.orderBy('news_posts.created_at', 'desc')
    },
    page: req.query.$page,
    withRelated: ['group','target_user.photo','link.service','attachments.asset','user.photo','likes','comments.user.photo','comments.attachments.asset','comments.link.service','comments.reactions.user.photo','comments.quoted_comment.user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(posts, PostSerializer)

}

export default listRoute
