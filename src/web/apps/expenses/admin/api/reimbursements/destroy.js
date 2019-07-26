import { destroyReimbursement } from '../../../services/reimbursements'
import socket from '../../../../../core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'

const destroyRoute = async (req, res) => {

  const reimbursement = await Reimbursement.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  const channels = [{
    channel: 'user',
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/reimbursements/${reimbursement.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }]

  await destroyReimbursement(req, reimbursement)

  await socket.refresh(req, channels)

  res.status(200).respond(true)

}

export default destroyRoute
