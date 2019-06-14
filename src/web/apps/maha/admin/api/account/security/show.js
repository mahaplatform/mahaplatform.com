import knex from '../../../../../../core/services/knex'

const showRoute = async (req, res) => {

  const alerts = await knex('maha_users_alerts').transacting(req.trx).where({
    user_id: req.user.get('id')
  })

  res.status(200).respond({
    ignored: alerts.map(alert => alert.alert_id)
  })

}

export default showRoute
