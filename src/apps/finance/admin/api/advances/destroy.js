import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import Advance from '@apps/finance/models/advance'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const advance = await Advance.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!advance) return res.status(404).respond({
    code: 404,
    message: 'Unable to load advance'
  })

  await advance.save({
    deleted_at: moment()
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'deleted {object}',
    object: advance
  })

  await socket.refresh(req, [
    `/admin/finance/advances/${advance.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  await advance.destroy({
    transacting: req.trx
  })

  await res.status(200).respond(true)

}

export default destroyRoute
