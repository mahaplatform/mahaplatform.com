import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { findOrCreateNumber } from '@apps/maha/services/numbers'
import SendFaxQueue from '@apps/maha/queues/send_fax_queue'
import socket from '@core/services/routes/emitter'
import FaxSerializer from '../../../serializers/fax_serializer'
import Fax from '@apps/maha/models/fax'

const createRoute = async (req, res) => {

  const from = await findOrCreateNumber(req, {
    number: req.body.from
  })

  const to = await findOrCreateNumber(req, {
    number: req.body.to
  })

  const fax = await Fax.forge({
    team_id: req.team.get('id'),
    type: 'outbound',
    status: 'pending',
    from_id: from.get('id'),
    to_id: to.get('id'),
    ...whitelist(req.body, ['asset_id'])
  }).save(null, {
    transacting: req.trx
  })

  await SendFaxQueue.enqueue(req, {
    id: fax.get('id')
  })

  await activity(req, {
    story: 'created {object}',
    object: fax
  })

  await socket.refresh(req, [
    '/admin/team/faxes'
  ])

  res.status(200).respond(fax, FaxSerializer)

}

export default createRoute
