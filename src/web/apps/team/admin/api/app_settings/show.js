import { Route } from '../../../../../core/backframe'
import Installation from '../../../../maha/models/installation'

const processor = async (req, trx, options) => {

  const conditions = {
    team_id: req.team.get('id'),
    app_id: req.params.app_id
  }

  const app = await Installation.where(conditions).fetch()

  return {
    settings: app.get('settings')
  }

}

const showRoute = new Route({
  method: 'get',
  path: '',
  processor
})

export default showRoute
