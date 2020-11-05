import socket from '@core/services/routes/emitter'
import Like from '../../../../models/like'

const createRoute = async (req, res) => {

  await Like.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    post_id: req.params.post_id
  }).save(null, {
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

  res.status(200).respond(true)

}

export default createRoute
