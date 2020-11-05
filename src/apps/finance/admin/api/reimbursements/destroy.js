import { destroyReimbursement } from '../../../services/reimbursements'
import socket from '@core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'

const destroyRoute = async (req, res) => {

  const reimbursement = await Reimbursement.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  await destroyReimbursement(req, reimbursement)

  await socket.refresh(req, [
    `/admin/finance/reimbursements/${reimbursement.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  res.status(200).respond(true)

}

export default destroyRoute
