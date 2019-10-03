import Alert from '../../../../models/alert'

const alertsRoute = async (req, res) => {

  const alerts = await Alert.fetchAll({
    withRelated: ['app'],
    transacting: req.trx
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

  const sorted = Object.keys(items).reduce((result, code) => [
    ...result,
    ...apps[code] ? [{
      title: apps[code].label,
      icon: apps[code].icon,
      color: apps[code].color,
      items: items[code]
    }] : []
  ], [])

  res.status(200).respond(sorted)

}

export default alertsRoute
