import { Route } from '../../../server'

const processor = async (req, trx, options) => {

  const alerts = await options.knex('maha_users_alerts').transacting(trx).where({
    user_id: req.user.get('id')
  })

  return {
    ignored: alerts.map(alert => alert.alert_id)
  }

}

const securityRoute = new Route({
  method: 'get',
  path: '',
  processor
})

export default securityRoute
