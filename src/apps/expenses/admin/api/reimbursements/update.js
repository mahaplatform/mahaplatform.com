import { createReimbursement, updateReimbursement, destroyReimbursement } from '../../../services/reimbursements'
import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import socket from '../../../../../web/core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'

const getLineItems = (item, line_items) => {
  const items = !line_items || line_items.length === 0 ? [{}] : line_items
  return items.map((line_item, index) => ({
    ...line_item,
    id: index === 0 && !line_item.id ? item.get('id') : line_item.id
  }))
}

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

  const line_items = await Reimbursement.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', reimbursement.get('code'))
  }).fetchAll({
    transacting: req.trx
  })

  const new_line_items = getLineItems(reimbursement, req.body.line_items)

  const reimbursements = await Promise.mapSeries(new_line_items, async(data) => {

    if(!data.id) {
      return await createReimbursement(req, {
        user_id: reimbursement.get('user_id'),
        code: reimbursement.get('code'),
        ...req.body,
        ...data
      })
    }

    const line_item = line_items.find(line_item => {
      return line_item.get('id') === data.id
    })

    return await updateReimbursement(req, line_item, {
      ...req.body,
      ...data
    })

  })

  await Promise.map(line_items, async (line_item) => {

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
