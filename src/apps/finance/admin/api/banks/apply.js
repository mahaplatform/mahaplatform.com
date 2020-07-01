import socket from '../../../../../core/services/routes/emitter'
import Bank from '../../../models/bank'
import moment from 'moment'

const applyRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  await bank.save({
    applied_on: moment()
  }, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/finance/banks/${bank.get('id')}`
  ])

  res.status(200).respond(true)

}

export default applyRoute
