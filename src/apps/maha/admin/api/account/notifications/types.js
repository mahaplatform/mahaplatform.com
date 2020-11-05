import NotificationType from '@apps/maha/models/notification_type'

const typesRoute = async (req, res) => {

  const notification_types = await NotificationType.fetchAll({
    withRelated: ['app'],
    transacting: req.trx
  })

  const items = notification_types.reduce((sorted, notification_type) => ({
    ...sorted,
    [notification_type.get('app_code')]: [
      ...sorted[notification_type.get('app_code')] || [],
      {
        id: notification_type.get('id'),
        app_id: notification_type.get('app_id'),
        title: notification_type.get('data').title,
        description: notification_type.get('data').description
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
  ], []).sort((a,b) => {
    if(a.title > b.title) return 1
    if(a.title < b.title) return -1
    return 0
  })

  res.status(200).respond(sorted)

}

export default typesRoute
