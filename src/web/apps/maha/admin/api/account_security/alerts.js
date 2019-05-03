import Alert from '../../../models/alert'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const alerts = await Alert.fetchAll({
    withRelated: ['app'],
    transacting: trx
  })

  const items = alerts.reduce((sorted, alert) => ({
    ...sorted,
    [alert.get('app_code')]: [
      ...sorted[alert.get('app_code')] || [],
      {
        id: alert.get('id'),
        app_id: alert.get('app_id'),
        title: alert.get('data').title,
        description: alert.get('data').description
      }
    ]
  }), {})

  const apps = {
    ...req.apps,
    maha: {
      label: 'Maha',
      icon: 'bars',
      color: 'blue'
    }
  }

  return Object.keys(items).reduce((result, code) => [
    ...result,
    ...apps[code] ? [{
      title: apps[code].label,
      icon: apps[code].icon,
      color: apps[code].color,
      items: items[code]
    }] : []
  ], [])

}

const alertsRoute = new Route({
  method: 'get',
  path: '/alerts',
  processor
})

export default alertsRoute
