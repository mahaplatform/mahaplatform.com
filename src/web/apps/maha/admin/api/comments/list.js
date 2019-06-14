import CommentSerializer from '../../../serializers/comment_serializer'
import Comment from '../../../models/comment'

const listRoute = async (req, res) => {

  const comments = await Comment.scope({
    team: req.team
  }).query(qb => {
    qb.where('commentable_type', req.params.commentable_type)
    qb.where('commentable_id', req.params.commentable_id)
    qb.orderBy('created_at', 'asc')
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo','attachments.asset.source','listenings','reactions.user.photo','quoted_comment.user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(comments, (comment) => {
    return CommentSerializer(req, comment)
  })

}

export default listRoute
