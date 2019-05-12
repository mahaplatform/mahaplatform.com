import Session from '../../../models/session'

const destroyRoute = async (req, res) => {

  const session = await Session.where({
    device_id: req.device.get('id'),
    user_id: req.user.get('id')
  }).fetch({ transacting: req.trx })

  session.save({
    is_active: false
  }, { patch: true, transacting: req.trx })

  res.status(200).respond({
    team_id: req.team.get('id')
  })

}

export default destroyRoute
