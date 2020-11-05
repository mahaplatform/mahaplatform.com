import socket from '@core/services/routes/emitter'
import Post from '../../../models/post'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const post = await Post.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.whereNull('deleted_at')
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!post) return res.status(404).respond({
    code: 404,
    message: 'Unable to load post'
  })

  await post.save({
    deleted_at: moment()
  }, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/news/posts'
  ])

  res.status(200).respond(true)

}

export default destroyRoute
