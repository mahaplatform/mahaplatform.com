import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import Installation from '@apps/maha/models/installation'

const installRoute = async (req, res) => {

  const installation = await Installation.where({
    app_id: req.params.id,
    team_id: req.team.get('id')
  }).fetch({
    transacting: req.trx
  })

  if(installation) return res.status(200).respond(true)

  const newinstallation = await Installation.forge({
    app_id: req.params.id,
    team_id: req.team.get('id'),
    settings: {}
  }).save(null, {
    transacting: req.trx
  })

  await newinstallation.load(['app'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'installed {object}',
    object: newinstallation
  })

  await socket.refresh(req, {
    channel: 'team',
    target: [
      '/admin/team/apps',
      `/admin/team/apps/${req.params.id}`
    ]
  })

  await res.status(200).respond(true)

}

export default installRoute
