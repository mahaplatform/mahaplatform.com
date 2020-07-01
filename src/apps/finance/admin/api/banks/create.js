import BankSerializer from '../../../serializers/bank_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Bank from '../../../models/bank'

const createRoute = async (req, res) => {

  const bank = await Bank.forge({
    team_id: req.team.get('id'),
    status: 'pending',
    title: req.body.title,
    bank_name: req.body.routing.bank_name,
    routing_number: req.body.routing.number,
    account_number: req.body.account_number,
    integration: req.body.integration
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: bank
  })

  await socket.refresh(req, [
    '/admin/finance/banks'
  ])

  res.status(200).respond(bank, BankSerializer)

}

export default createRoute
