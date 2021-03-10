import socket from '@core/services/routes/emitter'
import Profile from '@apps/maha/models/profile'

const destroyRoute = async (req, res) => {

  const profile = await Profile.query(qb => {
    qb.where('account_id', req.account.get('id'))
    qb.where('id', req.params.id )
  }).fetch({
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  await profile.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, {
    channel: 'user',
    target: '/admin/account/profiles'
  })

  await res.status(200).respond(true)

}

export default destroyRoute
