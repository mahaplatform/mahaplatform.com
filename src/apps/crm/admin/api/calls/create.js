import { findOrCreateNumber } from '../../../../maha/services/numbers'
import CallSerializer from '../../../serializers/call_serializer'
import Call from '../../../../maha/models/call'

const getNumberId = async (req, number) => {
  if(!number) return null
  const phone_number = await findOrCreateNumber(req, {
    number
  })
  return phone_number.get('id')
}

const createRoute = async (req, res) => {

  const from_id = await getNumberId(req, req.body.from)

  const to_id = await getNumberId(req, req.body.to)

  const call = await Call.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    program_id: req.body.program_id,
    phone_number_id: req.body.phone_number_id,
    from_id,
    to_id,
    direction: 'outbound',
    from_user_id: req.body.from_user_id,
    to_user_id: req.body.to_user_id
  }).save(null, {
    transacting: req.trx
  })

  await call.load(['to','from','program.logo','program.phone_number','user.photo','phone_number.contact.photo','from_user.photo','to_user.photo'], {
    transacting: req.trx
  })

  res.status(200).respond(call, CallSerializer)

}

export default createRoute
