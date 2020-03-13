import WorkflowEnrollment from '../../models/workflow_enrollment'
import generateCode from '../../../../core/utils/generate_code'
import SmsCampaign from '../../models/sms_campaign'
import client from '../../../../core/services/twilio'
import PhoneNumber from '../../models/phone_number'

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
    was_completed: false,
    was_converted: false
  }).save(null, {
    transacting: req.trx
  })

  await client.calls.create({
    method: 'GET',
    url: `${process.env.TWIML_HOST}/sms/crm/enrollments/${enrollment.get('code')}`,
    from: campaign.related('program').related('phone_number').get('number'),
    to: phone_number.get('number')
  })

}

export default sendMessage
