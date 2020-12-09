import WorkflowEnrollment from '@apps/automation/models/enrollment'
import { executeWorkflow } from '@apps/automation/services/workflows'

const showRoute = async (req, res) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('code', req.params.enrollment_code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load enrollment'
  })

  req.team = enrollment.related('team')

  if(req.body.AnsweredBy === 'machine_end_beep') {
    await enrollment.save({
      was_answering_machine: true
    },{
      transacting: req.trx
    })
  }

  const result = await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    call_status: 'in-progress',
    code: req.params.code,
    execute: req.params.verb !== 'next'
  }) || {}

  if(result.twiml) {
    return res.status(200).type('text/xml').send(result.twiml)
  }

  res.status(200).respond(true)

}

export default showRoute
