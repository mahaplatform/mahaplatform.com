import { Route } from '../../../../../core/backframe'
import Search from '../../../models/search'

const processor = async (req, trx, options) => {

  const user_id = req.user.get('id')

  await Search.where({ user_id }).destroy({ transacting: trx })

  return true

}

const clearRoute = new Route({
  path: '/clear',
  method: 'patch',
  processor
})

export default clearRoute
