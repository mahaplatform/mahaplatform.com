import { findOrCreateNumber } from '../../../../maha/services/numbers'
import CallSerializer from '../../../serializers/call_serializer'
import Call from '../../../../maha/models/call'

const createRoute = async (req, res) => {

  const from_number = await findOrCreateNumber(req, {
    number: req.body.from
  })

  const to_number = await findOrCreateNumber(req, {
    number: req.body.to
  })

  const call = await Call.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    program_id: req.body.program_id,
    phone_number_id: req.body.phone_number_id,
    from_id: from_number.get('id'),
    to_id: to_number.get('id'),
    direction: 'outbound'
  }).save(null, {
    transacting: req.trx
  })

  await call.load(['to','from','program.logo','program.phone_number','user.photo','phone_number.contact.photo'], {
    transacting: req.trx
  })

  res.status(200).respond(call, CallSerializer)

}

export default createRoute
