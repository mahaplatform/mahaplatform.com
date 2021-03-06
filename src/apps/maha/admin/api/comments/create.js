import { notifications } from '@core/services/routes/notifications'
import { attachments } from '@core/services/routes/attachments'
import CommentSerializer from '@apps/maha/serializers/comment_serializer'
import { whitelist } from '@core/services/routes/params'
import { objects } from '@core/services/routes/objects'
import { extractAttachments } from '@apps/maha/services/attachments'
import socket from '@core/services/routes/emitter'
import registry from '@core/utils/registry'
import Comment from '@apps/maha/models/comment'

const createRoute = async (req, res) => {

  const comment = await Comment.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    commentable_type: req.params.commentable_type,
    commentable_id: req.params.commentable_id,
    ...whitelist(req.body, ['uid','text','link_id','quoted_comment_id'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.asset_ids) await attachments(req, {
    team_id: req.team.get('id'),
    attachable_type: 'maha_comments',
    attachable_id: comment.get('id'),
    asset_ids: req.body.asset_ids
  })

  const model = registry.lookup(req.params.commentable_type)

  const commentable = await model.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.commentable_id)
  }).fetch({
    transacting: req.trx
  })

  await extractAttachments(req, comment, req.body.text)

  await comment.load(['user.photo','link.service','attachments.asset','quoted_comment.user.photo'], {
    transacting: req.trx
  })

  await socket.message(req, {
    channel: `/admin/${req.params.commentable_type}/${req.params.commentable_id}/comments`,
    action: 'add_comment',
    data: {
      comment: CommentSerializer(req, comment)
    }
  })

  const object = await objects(req, {
    object_type: req.params.commentable_type,
    object_id: req.params.commentable_id
  })

  await notifications(req, {
    type: 'maha:item_comment',
    listenable: commentable,
    subject_id: req.user.get('id'),
    story: 'commented on {object}',
    object
  })

  await res.status(200).respond(comment, CommentSerializer)

}

export default createRoute
