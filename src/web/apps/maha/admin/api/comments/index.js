import CommentSerializer from '../../../serializers/comment_serializer'
import { extractAttachments } from '../../../services/attachment'
import Attachment from '../../../models/attachment'
import Listening from '../../../models/listening'
import models from '../../../../../core/utils/models'
import Comment from '../../../models/comment'
import { Resources } from '../../../../../core/backframe'
import _ from 'lodash'

const listeners = async (req, trx, result, options) => {

  const team_id = req.team.get('id')

  const listenable_type = result.get('commentable_type')

  const listenable_id = result.get('commentable_id')

  const user_id = result.get('user_id')

  const active_listeners = await Listening.where({ team_id, listenable_type, listenable_id}).fetchAll({ transacting: trx })

  const active_listener_ids = active_listeners.map(listener => listener.get('user_id'))

  if(_.includes(active_listener_ids, user_id)) return

  await Listening.forge({
    team_id,
    listenable_type,
    listenable_id,
    user_id
  }).save(null, { transacting: trx })

}

const richComments = async (req, trx, result, options) => {

  const text = req.body.text.replace('<p>','').replace('</p>', '\r\n')

  await extractAttachments(result, text, trx)

  await result.load(['attachments.asset.source'], { transacting: trx })

}


const addAttachments = async (req, trx, result, options) => {

  if(!req.body.asset_ids) return

  await Promise.mapSeries(req.body.asset_ids, async (asset_id, index) => {

    await Attachment.forge({
      team_id: req.team.get('id'),
      type: 'asset',
      attachable_type: 'maha_comments',
      attachable_id: result.get('id'),
      delta: index,
      asset_id
    }).save(null, { transacting: trx })

  })

}

const afterCreateProcessor = async (req, trx, result, options) => {

  await listeners(req, trx, result, options)

  await addAttachments(req, trx, result, options)

  await richComments(req, trx, result, options)

}

const defaultQuery = (req, trx, qb, options) => {

  qb.where({ commentable_type: req.params.commentable_type })

  qb.where({ commentable_id: req.params.commentable_id })

  qb.orderBy('created_at', 'asc')

}

const defaultParams = (req, trx, options) => ({
  user_id: req.user.get('id'),
  commentable_type: req.params.commentable_type,
  commentable_id: req.params.commentable_id
})

const notification = async (req, trx, result, options) => {

  const object = await models(result.get('commentable_type')).where({
    id: result.get('commentable_id')
  }).fetch({
    withRelated: ['listenings'],
    transacting: trx
  })

  const recipient_ids = object.related('listenings').filter(listener => {

    return listener.get('user_id') !== req.user.get('id')

  }).map(listener => listener.get('user_id'))

  return {
    type: 'maha:item_comment',
    recipient_ids,
    subject_id: req.user.get('id'),
    story: 'commented on {object}',
    object
  }

}

const message = action => (req, trx, result, options) => ({
  channel: `/admin/${req.params.commentable_type}/${req.params.commentable_id}/comments`,
  action,
  data: {
    comment: CommentSerializer(req, trx, result)
  }
})

const messages = {
  create: message('add_comment'),
  update: message('replace_comment'),
  destroy: (req, trx, result, options) => ({
    channel: `/admin/${req.params.commentable_type}/${req.params.commentable_id}/comments`,
    action: 'remove_comment',
    data: {
      uid: req.params.id
    }
  })
}

const commentResources = new Resources({
  afterProcessor: {
    create: afterCreateProcessor,
    update: richComments
  },
  allowedParams: ['uid','text','quoted_comment_id'],
  defaultParams,
  defaultQuery,
  messages,
  model: Comment,
  notification: {
    create: notification
  },
  only: ['list','create','update','destroy'],
  path: '/:commentable_type/:commentable_id/comments',
  primaryKey: 'uid',
  serializer: CommentSerializer,
  withRelated: ['user.photo','attachments.asset.source','listenings','reactions.user.photo','quoted_comment.user.photo']
})

export default commentResources
