import { message } from '../../../../../core/services/routes/emitter'
import Comment from '../../../models/comment'

const destroyRoute = async (req, res) => {

  const comment = await Comment.query(qb => {
    qb.where('uid', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  await comment.destroy({
    transacting: req.trx
  })

  await message(req, {
    channel: `/admin/${req.params.commentable_type}/${req.params.commentable_id}/comments`,
    action: 'remove_comment',
    data: {
      uid: req.params.id
    }
  })

  res.status(200).respond(true)

}

export default destroyRoute
