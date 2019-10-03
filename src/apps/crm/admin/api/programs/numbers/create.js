import { activity } from '../../../../../../web/core/services/routes/activities'
import { whitelist } from '../../../../../../web/core/services/routes/params'
import NumberSerializer from '../../../../serializers/number_serializer'
import socket from '../../../../../../web/core/services/routes/emitter'
import Number from '../../../../models/number'

const createRoute = async (req, res) => {

  const number = await Number.forge({
    team_id: req.team.get('id'),
    program_id: req.params.program_id,
    ...whitelist(req.body, ['number','locality','region'])
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}/numbers`
  ])

  await activity(req, {
    story: 'provisioned {object}',
    object: number
  })

  res.status(200).respond(number, NumberSerializer)

}

export default createRoute
