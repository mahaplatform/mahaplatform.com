import CommentSerializer from '../../../serializers/comment_serializer'
import Comment from '../../../models/comment'

const listRoute = async (req, res) => {

  const comments = await Comment.filterFetch({
    scope: (qb) => {
      qb.where('commentable_type', req.params.commentable_type)
      qb.where('commentable_id', req.params.commentable_id)
      qb.where('team_id', req.team.get('id'))
      qb.orderBy('created_at', 'asc')
    },
    page: req.query.$page,
    withRelated: ['user.photo','link.service','attachments.asset.source','reactions.user.photo','quoted_comment.user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(comments, CommentSerializer)

}

export default listRoute
