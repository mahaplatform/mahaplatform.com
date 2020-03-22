import PostSerializer from '../../../serializers/post_serializer'
import Post from '../../../models/post'

const listRoute = async (req, res) => {

  const posts = await Post.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.orderBy('created_at', 'desc')
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
