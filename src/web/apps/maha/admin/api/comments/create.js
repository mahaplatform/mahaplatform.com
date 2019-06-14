import { notifications } from '../../../../../core/services/routes/notifications'
import { attachments } from '../../../../../core/services/routes/attachments'
import { listeners } from '../../../../../core/services/routes/listeners'
import { objects } from '../../../../../core/services/routes/objects'
import CommentSerializer from '../../../serializers/comment_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { extractAttachments } from '../../../services/attachment'
import Comment from '../../../models/comment'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const data = _.pick(req.body, ['uid','text','quoted_comment_id'])

  const comment = await Comment.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    commentable_type: req.params.commentable_type,
    commentable_id: req.params.commentable_id,
    ...data
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.asset_ids) await attachments(req, {
    attachable_type: 'maha_comments',
    attachable_id: comment.get('id'),
    asset_ids: req.body.asset_ids
  })

  await listeners(req, {
    user_id: req.user.get('id'),
    listenable_type: req.params.commentable_type,
    listenable_id: req.params.commentable_id
  })

  await extractAttachments(comment, req.body.text, req.trx)

  await comment.load(['user.photo','attachments.asset.source'], {
    transacting: req.trx
  })

  await socket.message(req, {
    channel: `/admin/${req.params.commentable_type}/${req.params.commentable_id}/comments`,
    action: 'add_comment',
    data: {
      comment: CommentSerializer(req, req.trx, comment)
    }
  })

  const object = await objects(req, {
    object_type: req.params.commentable_type,
    object_id: req.params.commentable_id
  })

  await notifications(req, {
    type: 'maha:item_comment',
    listenable_type: req.params.commentable_type,
    listenable_id: req.params.commentable_id,
    subject_id: req.user.get('id'),
    story: 'commented on {object}',
    object
  })

  res.status(200).respond(comment, (comment) => {
    return CommentSerializer(req, req.trx, comment)
  })

}

export default createRoute
