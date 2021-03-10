import LikeSerializer from '@apps/news/serializers/like_serializer'
import Like from '@apps/news/models/like'

const listRoute = async (req, res) => {

  const likes = await Like.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('post_id', req.params.post_id)
      qb.orderBy('created_at', 'asc')
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(likes, LikeSerializer)

}

export default listRoute
