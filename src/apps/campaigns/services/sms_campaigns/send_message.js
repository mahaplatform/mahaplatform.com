import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import { contactActivity } from '@apps/crm/services/activities'
import SmsCampaign from '@apps/campaigns/models/sms_campaign'
import PhoneNumber from '@apps/crm/models/phone_number'
import generateCode from '@core/utils/generate_code'
import twilio from '@core/vendor/twilio'
import { twiml } from 'twilio'

const sendMessage = async (req, params) => {

  const { sms_campaign_id, phone_number_id, contact_id } = params

  const campaign = await SmsCampaign.query(qb => {
    qb.where('id', sms_campaign_id)
  }).fetch({
    withRelated: ['program.phone_number'],
    transacting: req.trx
  })

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('id', phone_number_id)
  }).fetch({
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  const enrollment = await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    sms_campaign_id,
    phone_number_id,
    contact_id,
    code,
    data: {},
    status: 'active',
    was_converted: false,
    was_opted_out: false
  }).save(null, {
    transacting: req.trx
  })

  await enrollment.load(['contact','sms_campaign'], {
    transacting: req.trx
  })

  await contactActivity(req, {
    contact: enrollment.related('contact'),
    type: 'sms_campaign',
    story: 'received an outbound sms campaign',
    program_id: enrollment.related('sms_campaign').get('program_id'),
    data: {
      enrollment_id: enrollment.get('id'),
      sms_campaign_id: enrollment.related('sms_campaign').get('id')
    }
  })

  const response = new twiml.MessagingResponse()

  response.redirect(`${process.env.TWILIO_HOST_TWIML}/sms?workflow=${campaign.get('code')}`)

  console.log({
    from: campaign.related('program').related('phone_number').get('number'),
    to: phone_number.get('number'),
    body: response.toString(),
    statusCallbackMethod: 'POST',
    statusCallback: `${process.env.TWIML_HOST}/sms_status`
  })

  await twilio.messages.create({
    from: campaign.related('program').related('phone_number').get('number'),
    to: phone_number.get('number'),
    body: response.toString(),
    statusCallbackMethod: 'POST',
    statusCallback: `${process.env.TWIML_HOST}/sms_status`
  })

}

export default sendMessage
