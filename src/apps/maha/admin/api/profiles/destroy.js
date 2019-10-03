import socket from '../../../../../core/services/routes/emitter'
import Profile from '../../../models/profile'

const destroyRoute = async (req, res) => {

  const profile = await Profile.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['source'],
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

  res.status(200).respond(true)

}

export default destroyRoute
