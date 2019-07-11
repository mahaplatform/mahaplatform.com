import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Assignment from '../../../models/assignment'
import moment from 'moment'

const completeRoute = async (req, res) => {

  const assignment = await Assignment.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!assignment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load assignment'
  })

  await assignment.save({
    ...whitelist(req.body, ['feedback']),
    completed_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'completed',
    auditable: assignment
  })

  // await activity(req, {
  //   story: 'registered for {object}',
  //   object: category
  // })

  await socket.refresh(req, [
    `/admin/training/offerings/${assignment.get('offering_id')}`,
    `/admin/training/offerings/${req.body.offering_id}`,
    `/admin/training/assignments/${assignment.get('id')}`
  ])

  res.status(200).respond(true)

}

export default completeRoute
