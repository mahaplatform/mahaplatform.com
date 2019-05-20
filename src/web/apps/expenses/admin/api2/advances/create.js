import { activity } from '../../../../../core/services/routes/activities'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Advance from '../../../models/advance'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['project_id','expense_type_id','date_needed','description','amount','description'])

  const data = _.omitBy(allowed, _.isNil)

  const advance = await Advance.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status_id: 1,
    ...data
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: advance
  })

  await audit(req, {
    story: 'created',
    auditable: {
      tableName: 'expenses_advances',
      id: advance.get('id')
    }
  })

  await socket.refresh(req, [{
    channel: `/admin/users/${req.user.get('id')}`,
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/advances/${advance.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(advance, (advance) => {
    return AdvanceSerializer(req, req.trx, advance)
  })

}

export default createRoute
