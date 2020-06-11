import WorkflowEnrollment from '../../models/workflow_enrollment'
import socket from '../../../../core/services/routes/emitter'
import { executeWorkflow } from '../../services/workflows'

const voicemailRoute = async (req, res) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('code', req.params.enrollment_code)
  }).fetch({
    withRelated: ['team','voice_campaign'],
    transacting: req.trx
  })

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load enrollment'
  })

  req.team = enrollment.related('team')

  const result = await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    call_status: 'in-progress',
    code: req.params.code,
    execute: true,
    recording: {
      url: req.body.RecordingUrl,
      duration: req.body.RecordingDuration
    }
  }) || {}

  await socket.refresh(req, [
    `/admin/crm/programs/${enrollment.related('voice_campaign').get('program_id')}/voicemails`
  ])

  if(!result.twiml) res.status(200).respond(true)

  res.status(200).type('text/xml').send(result.twiml)

}

export default voicemailRoute
