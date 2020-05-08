import WorkflowEnrollment from '../../models/workflow_enrollment'
import { executeWorkflow } from '../../services/workflows'
import _ from 'lodash'

const showRoute = async (req, res) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('code', req.params.enrollment_code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = enrollment.related('team')

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load enrollment'
  })

  if(req.body.AnsweredBy === 'machine_end_beep') {
    await enrollment.save({
      was_answering_machine: true
    },{
      transacting: req.trx
    })
  }

  const result = await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    code: req.params.code,
    execute: !_.includes(['gather','next'], req.params.verb),
    answer: req.params.verb === 'gather' ? req.body.Digits : null,
    recording: req.params.verb === 'record' ? req.body.RecordingUrl : null
  }) || {}

  if(result.twiml) {
    return res.status(200).type('text/xml').send(result.twiml)
  }

  res.status(200).respond(true)

}

export default showRoute
