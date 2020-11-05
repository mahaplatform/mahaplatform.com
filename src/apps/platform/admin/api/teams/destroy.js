import socket from '@core/services/routes/emitter'
import Team from '@apps/maha/models/team'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const team = await Team.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!team) return res.status(404).respond({
    code: 404,
    message: 'Unable to load team'
  })

  await team.save({
    deleted_at: moment()
  }, {
    transacting: req.trx,
    patch: true
  })

  await socket.refresh(req, [
    '/admin/platform/teams'
  ])

  res.status(200).respond(true)

}

export default destroyRoute
