import socket from '@core/services/routes/emitter'
import Like from '@apps/news/models/like'

const destroyRoute = async (req, res) => {

  const like = await Like.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('user_id', req.user.get('id'))
    qb.where('post_id', req.params.post_id)
  }).fetch({
    transacting: req.trx
  })

  if(!like) return res.status(404).respond({
    code: 404,
    message: 'Unable to load like'
  })

  await like.destroy({
    transacting: req.trx
  })

  const likes = await req.trx('news_likes').where({
    post_id: req.params.post_id
  })

  await socket.message(req, {
    channel: '/admin/news',
    action: 'update_liker_ids',
    data: {
      post_id: req.params.post_id,
      liker_ids: likes.map(like => like.user_id)
    }
  })

  await res.status(200).respond(true)

}

export default destroyRoute
