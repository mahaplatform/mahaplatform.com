import { activity } from '../../../../../../core/services/routes/activities'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import Disbursement from '../../../../models/disbursement'

const createRoute = async (req, res) => {

  const disbursement = await Disbursement.query(qb => {
    qb.select('finance_disbursements.*','finance_disbursement_totals.*')
    qb.innerJoin('finance_disbursement_totals', 'finance_disbursement_totals.disbursement_id', 'finance_disbursements.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['merchant'],
    transacting: req.trx
  })

  if(!disbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load disbursement'
  })

  await disbursement.save({
    status: 'processed'
  }, {
    transacting: req.trx,
    patch: true
  })

  await activity(req, {
    story: 'processed {object}',
    object: disbursement
  })

  await audit(req, {
    story: 'processed',
    auditable: disbursement
  })

  await socket.refresh(req, [
    '/admin/finance/disbursements',
    `/admin/finance/disbursements/${disbursement.id}`
  ])

  res.status(200).respond(true)

}

export default createRoute
