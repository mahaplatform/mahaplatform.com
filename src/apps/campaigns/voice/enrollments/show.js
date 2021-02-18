import { getEnrollmentTokens } from '@apps/automation/services/enrollments'
import executeStep from '@apps/automation/services/workflows/execute_step'
import Enrollment from '@apps/automation/models/workflow_enrollment'
import WorkflowAction from '@apps/automation/models/workflow_action'
import { renderWorkflow } from '@apps/automation/services/workflows'
import Twilio from 'twilio'

const showRoute = async (req, res) => {

  const enrollment = await Enrollment.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['call','contact','team','version','voice_campaign.program'],
    transacting: req.trx
  })

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  req.team = enrollment.related('team')

  const voice_campaign = enrollment.related('voice_campaign')

  const tokens = await getEnrollmentTokens(req, {
    contact: enrollment.related('contact'),
    enrollment,
    program: voice_campaign.related('program')
  })

  const config = await renderWorkflow(req, {
    config: enrollment.related('version').get('value')
  })

  const twiml = new Twilio.twiml.VoiceResponse()

  const result = await executeStep(req, {
    config,
    contact: enrollment.related('contact'),
    enrollment,
    program: voice_campaign.related('program'),
    state: req.query.state,
    tokens,
    twiml
  })

  if(result.next) {
    result.twiml.redirect(`${process.env.TWILIO_HOST_TWIML}/voice/campaigns/enrollments/${enrollment.get('code')}?state=${result.next}`)
  } else {
    result.twiml.hangup()
  }

  res.status(200).type('text/xml').send(result.twiml.toString())

}

export default showRoute
