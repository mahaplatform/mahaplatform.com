import socket from '../../../../../core/services/routes/emitter'
import Merchant from '../../../models/merchant'
import moment from 'moment'

const applyRoute = async (req, res) => {

  const merchant = await Merchant.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!merchant) return res.status(404).respond({
    code: 404,
    message: 'Unable to load merchant'
  })

  await merchant.save({
    applied_on: moment()
  }, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/finance/merchants/${merchant.get('id')}`
  ])

  res.status(200).respond(true)

}

export default applyRoute
