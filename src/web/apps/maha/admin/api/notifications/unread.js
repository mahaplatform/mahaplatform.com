import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const select = options.knex.raw('count(maha_notifications.*) as unread')

  const result = await options.knex('maha_notifications').transacting(trx).select(select).where({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    is_seen: false
  })

  const count = parseInt(result[0].unread)

  return { count }

}

const unreadRoute = new Route({
  path: '/unread',
  method: 'get',
  processor
})

export default unreadRoute
