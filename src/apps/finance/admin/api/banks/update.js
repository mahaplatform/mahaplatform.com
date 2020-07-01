import { activity } from '../../../../../core/services/routes/activities'
import BankSerializer from '../../../serializers/bank_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Bank from '../../../models/bank'

const updateRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    patch: true,
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  await bank.save(whitelist(req.body, ['title','integration']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: bank
  })

  await audit(req, {
    story: 'updated',
    auditable: bank
  })

  await socket.refresh(req, [
    '/admin/finance/banks',
    `/admin/finance/banks/${req.params.id}`
  ])

  res.status(200).respond(bank, BankSerializer)

}

export default updateRoute
