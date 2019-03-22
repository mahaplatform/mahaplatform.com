import { Route } from '../../../server'
import Profile from '../../../models/profile'

const processor = async (req, trx, options) => {

  const query = qb => qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id')

  const profile = await Profile.query(query).where({ text: req.params.source, user_id: req.user.get('id')}).fetch({ transacting: trx })

  return (profile !== null)

}

const checkRoute = new Route({
  method: 'get',
  path: '/:source/check',
  processor
})

export default checkRoute
