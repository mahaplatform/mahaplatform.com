import { notifications } from '../../../../../../core/services/routes/notifications'
import { audit } from '../../../../../../core/services/routes/audit'
import BatchSerializer from '../../../../serializers/batch_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import Allocation from '../../../../models/allocation'
import Batch from '../../../../models/batch'
import moment from 'moment'

const createRoute = async (req, res) => {

  const allocations = await Allocation.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.body.filter
    },
    transacting: req.trx
  }).then(result => result.toArray())

  const settings = req.app.get('settings')

  const batch = await Batch.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    type: 'revenue',
    integration: settings.integration,
    date: req.body.date || moment().format('YYYY-MM-DD')
  }).save(null, {
    transacting: req.trx
  })

  const allocation_ids = allocations.map(allocation => {
    return allocation.id
  })

  await req.trx('finance_allocations').whereIn('id', allocation_ids).update({
    batch_id: batch.get('id'),
    status: 'processed'
  })

  await socket.refresh(req, [
    '/admin/finance/reports/revenue'
  ])

  res.status(200).respond(batch, BatchSerializer)

}

export default createRoute
