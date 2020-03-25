import PostSerializer from '../../../serializers/post_serializer'
import Post from '../../../models/post'

const showRoute = async (req, res) => {

  const post = await Post.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.whereNull('deleted_at')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['attachments.asset.source','user.photo','likes','comments.user.photo','comments.attachments.asset.source','comments.link.service','comments.reactions.user.photo','comments.quoted_comment.user.photo'],
    transacting: req.trx
  })

  if(!post) return res.status(404).respond({
    code: 404,
    message: 'Unable to load post'
  })

  res.status(200).respond(post, PostSerializer)

}

export default showRoute
