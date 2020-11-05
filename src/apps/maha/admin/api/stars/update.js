import socket from '@core/services/routes/emitter'
import Star from '@apps/maha/models/star'

const fetchStar = async (req) => {

  const star = await Star.where({
    user_id: req.user.get('id'),
    starrable_type: req.params.starrable_type,
    starrable_id: req.params.starrable_id
  }).fetch({
    transacting: req.trx
  })

  if(star) {
    await star.destroy({
      transacting: req.trx
    })
    return null
  }

  return await Star.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    starrable_type: req.params.starrable_type,
    starrable_id: req.params.starrable_id
  }).save(null, {
    transacting: req.trx
  })

}

const updateRoute = async (req, res) => {

  const star = await fetchStar(req)

  await socket.message(req, {
    channel: '/admin/stars',
    action: 'update_stars',
    data: {
      table: req.params.starrable_type,
      id: parseInt(req.params.starrable_id),
      starred: star !== null
    }
  })

  res.status(200).respond(true)

}

export default updateRoute
