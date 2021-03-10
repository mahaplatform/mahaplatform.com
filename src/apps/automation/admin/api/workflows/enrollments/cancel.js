import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import socket from '@core/services/routes/emitter'
import Workflow from '@apps/automation/models/workflow'
import moment from 'moment'

const cancelRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('workflow_id', workflow.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['contact.photo'],
    transacting: req.trx
  })

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load enrollment'
  })

  await enrollment.save({
    status: 'canceled',
    unenrolled_at: moment()
  }, {
    transacting: req.trx,
    patch: true
  })

  await socket.refresh(req, [
    '/admin/automation/workflows',
    `/admin/automation/workflows/${workflow.get('id')}`,
    `/admin/automation/workflows/${workflow.get('id')}/enrollments/${enrollment.get('id')}`
  ])

  await res.status(200).respond(true)

}

export default cancelRoute
