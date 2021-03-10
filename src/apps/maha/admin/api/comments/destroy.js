import socket from '@core/services/routes/emitter'
import Comment from '@apps/maha/models/comment'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const comment = await Comment.query(qb => {
    qb.where('uid', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  await comment.save({
    deleted_at: moment()
  }, {
    transacting: req.trx
  })

  await socket.message(req, {
    channel: `/admin/${req.params.commentable_type}/${req.params.commentable_id}/comments`,
    action: 'remove_comment',
    data: {
      uid: req.params.id
    }
  })

  await res.status(200).respond(true)

}

export default destroyRoute
