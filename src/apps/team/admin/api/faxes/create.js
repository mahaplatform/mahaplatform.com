import SendFaxQueue from '../../../../maha/queues/send_fax_queue'
import FaxSerializer from '../../../serializers/fax_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Fax from '../../../../maha/models/fax'

const createRoute = async (req, res) => {

  const fax = await Fax.forge({
    team_id: req.team.get('id'),
    type: 'outbound',
    status: 'pending',
    ...whitelist(req.body, ['number_id','to','asset_id'])
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
