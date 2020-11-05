import BankSerializer from '../../../../finance/serializers/bank_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Bank from '../../../../finance/models/bank'

const createRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  await bank.save({
    status: 'active',
    ...whitelist(req.body, ['braintree_id','rate','amex_rate','has_paypal'])
  }, {
    transacting: req.trx,
    patch: true
  })

  await activity(req, {
    story: 'updated {object}',
    object: bank
  })

  await socket.refresh(req, [
    `/admin/platform/teams/${req.params.team_id}`,
    `/admin/platform/finance/banks/${bank.get('id')}`
  ])

  res.status(200).respond(bank, BankSerializer)

}

export default createRoute
