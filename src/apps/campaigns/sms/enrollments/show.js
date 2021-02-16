import { getEnrollmentTokens } from '@apps/automation/services/enrollments'
import executeStep from '@apps/automation/services/workflows/execute_step'
import Enrollment from '@apps/automation/models/workflow_enrollment'
import WorkflowAction from '@apps/automation/models/workflow_action'
import Twilio from 'twilio'

const showRoute = async (req, res) => {

  const enrollment = await Enrollment.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['call','contact','team','sms_campaign.program'],
    transacting: req.trx
  })

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  req.team = enrollment.related('team')

  const sms_campaign = enrollment.related('sms_campaign')

  const tokens = await getEnrollmentTokens(req, {
    contact: enrollment.related('contact'),
    enrollment,
    program: sms_campaign.related('program')
  })

  const twiml = new Twilio.twiml.VoiceResponse()

  const result = await executeStep(req, {
    config: sms_campaign.get('config'),
    contact: enrollment.related('contact'),
    enrollment,
    program: sms_campaign.related('program'),
    tokens,
    twiml
  })

  if(result.action) {
    await WorkflowAction.forge({
      team_id: req.team.get('id'),
      enrollment_id: enrollment.get('id'),
      ...result.action
    }).save(null, {
      transacting: req.trx
    })
  }

  if(result.converted) {
    await enrollment.save({
      was_converted: true
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  if(result.next) {
    result.twiml.redirect(`${process.env.TWILIO_HOST_TWIML}/sms/campaigns/enrollments/${enrollment.get('code')}?state=${result.next}`)
  } else {
    result.twiml.hangup()
  }

  res.status(200).type('text/xml').send(result.twiml.toString())

}

export default showRoute
