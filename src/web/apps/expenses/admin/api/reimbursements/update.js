import { createReimbursement, updateReimbursement, destroyReimbursement } from '../../../services/reimbursements'
import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'

const updateRoute = async (req, res) => {

  const reimbursement = await Reimbursement.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['line_items'],
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  const reimbursements = await Promise.mapSeries(req.body.line_items, async(data) => {

    if(data.id) {

      const line_item = reimbursement.related('line_items').find(line_item => {
        return line_item.get('id') === data.id
      })

      return await updateReimbursement(req, line_item, {
        ...req.body,
        ...data
      })

    }

    return await createReimbursement(req, {
      user_id: reimbursement.get('user_id'),
      code: reimbursement.get('code'),
      ...req.body,
      ...data
    })

  })

  await Promise.map(reimbursement.related('line_items'), async (line_item) => {

    const found = reimbursements.find(reimbursement => {
      return reimbursement.get('id') === line_item.get('id')
    })

    if(!found) await destroyReimbursement(req, line_item)

  })

  await socket.refresh(req, [
    ...reimbursements.map(reimbursement => `/admin/expenses/reimbursements/${reimbursement.get('id')}`),
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  res.status(200).respond(reimbursement, ReimbursementSerializer)

}

export default updateRoute
