import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import Reimbursement from '../../../models/reimbursement'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['date','project_id','expense_type_id','vendor_id','description','amount'])

  const data = _.omitBy(allowed, _.isNil)

  const reimbursement = await Reimbursement.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status_id: 1,
    ...data
  }).save(null, {
    transacting: req.trx
  })

  await createReceipts(req, 'reimbursement', reimbursement)

  await activity(req, {
    story: 'created {object}',
    object: reimbursement
  })

  await audit(req, {
    story: 'created',
    auditable: {
      tableName: 'expenses_reimbursements',
      id: reimbursement.get('id')
    }
  })

  await socket.refresh(req, [{
    channel: `/admin/users/${req.user.get('id')}`,
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/reimbursements/${reimbursement.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(reimbursement, (reimbursement) => {
    return ReimbursementSerializer(req, req.trx, reimbursement)
  })

}

export default createRoute
