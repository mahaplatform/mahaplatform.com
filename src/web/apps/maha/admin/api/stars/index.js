import { Route } from '../../../../../core/backframe'
import Star from '../../../models/star'

const fetchStar = async (req, trx, options) => {

  const { starrable_type, starrable_id } = req.params

  const star = await Star.where({
    user_id: req.user.get('id'),
    starrable_type,
    starrable_id
  }).fetch({ transacting: trx })

  if(star) {

    await star.destroy({ transacting: trx })

    return null

  }

  return await Star.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    starrable_type,
    starrable_id
  }).save(null, { transacting: trx })

}

const processor = async (req, trx, options) => {

  const star = await fetchStar(req, trx, options)

  await socket.in('/admin/stars').emit('message', {
    target: '/admin/stars',
    action: 'update_stars',
    data: {
      table: req.params.starrable_type,
      id: parseInt(req.params.starrable_id),
      starred: star !== null
    }
  })

}

const starRoute = new Route({
  method: 'patch',
  path: '/:starrable_type/:starrable_id/star',
  processor
})

export default starRoute
