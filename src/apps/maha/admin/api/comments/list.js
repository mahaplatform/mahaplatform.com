import CommentSerializer from '@apps/maha/serializers/comment_serializer'
import Comment from '@apps/maha/models/comment'

const listRoute = async (req, res) => {

  const comments = await Comment.filterFetch({
    scope: (qb) => {
      qb.where('commentable_type', req.params.commentable_type)
      qb.where('commentable_id', req.params.commentable_id)
      qb.where('team_id', req.team.get('id'))
      qb.whereNull('deleted_at')
      qb.orderBy('created_at', 'asc')
    },
    page: req.query.$page,
    withRelated: ['user.photo','link.service','attachments.asset','reactions.user.photo','quoted_comment.user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(comments, CommentSerializer)

}

export default listRoute
