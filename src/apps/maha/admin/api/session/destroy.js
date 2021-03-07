import Signin from '@apps/maha/models/signin'

const destroyRoute = async (req, res) => {

  const signin = await Signin.where({
    account_id: req.account.get('id'),
    device_id: req.device.get('id')
  }).fetch({
    transacting: req.trx
  })

  await signin.save({
    is_active: false
  }, {
    transacting: req.trx,
    patch: true
  })

  res.status(200).respond({
    team_id: req.team.get('id')
  })

}

export default destroyRoute
