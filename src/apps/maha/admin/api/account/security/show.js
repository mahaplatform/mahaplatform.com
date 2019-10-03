const showRoute = async (req, res) => {

  const alerts = await req.trx('maha_users_alerts')
    .where('user_id', req.user.get('id'))

  res.status(200).respond({
    ignored: alerts.map(alert => alert.alert_id)
  })

}

export default showRoute
