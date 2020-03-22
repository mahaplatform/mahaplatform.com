import { whitelist } from '../../../../../core/services/routes/params'
import PostSerializer from '../../../serializers/post_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Attachment from '../../../../maha/models/attachment'
import Post from '../../../models/post'

const createRoute = async (req, res) => {

  const post = await Post.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    is_active: true,
    ...whitelist(req.body, ['group_id','text'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.asset_ids) {

    await Promise.map(req.body.asset_ids, async (asset_id, delta) => {
      await Attachment.forge({
        team_id: req.team.get('id'),
        type: 'asset',
        delta,
        asset_id,
        attachable_type: 'news_posts',
        attachable_id: post.get('id')
      }).save(null, {
        transacting: req.trx
      })
    })

    await post.load(['attachments.asset.source'], {
      transacting: req.trx
    })

  }

  await socket.refresh(req, [
    '/admin/news/posts'
  ])

  res.status(200).respond(post, PostSerializer)

}

export default createRoute
