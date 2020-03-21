import { whitelist } from '../../../../../core/services/routes/params'
import PostSerializer from '../../../serializers/post_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Post from '../../../models/post'

const createRoute = async (req, res) => {

  const post = await Post.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    ...whitelist(req.body, ['text'])
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/news/posts'
  ])

  res.status(200).respond(post, PostSerializer)

}

export default createRoute
