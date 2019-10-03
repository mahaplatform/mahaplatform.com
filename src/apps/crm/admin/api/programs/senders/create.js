import { activity } from '../../../../../../web/core/services/routes/activities'
import { whitelist } from '../../../../../../web/core/services/routes/params'
import SenderSerializer from '../../../../serializers/sender_serializer'
import socket from '../../../../../../web/core/services/routes/emitter'
import Sender from '../../../../models/sender'

const createRoute = async (req, res) => {

  const sender = await Sender.forge({
    team_id: req.team.get('id'),
    program_id: req.params.program_id,
    ...whitelist(req.body, ['name','email'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: sender
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}/senders`
  ])

  res.status(200).respond(sender, SenderSerializer)

}

export default createRoute
