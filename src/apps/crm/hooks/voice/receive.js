import generateCode from '../../../../core/utils/generate_code'
import VoiceCampaign from '../../models/voice_campaign'
import PhoneNumber from '../../models/phone_number'
import Enrollment from '../../models/enrollment'
import Step from '../../models/step'
import { twiml } from 'twilio'

const receive = async (req, { call, phone_number }) => {

  const campaign = await VoiceCampaign.query(qb => {
    qb.where('phone_number_id', phone_number.get('id'))
  }).fetch({
    withRelated: ['workflow'],
    transacting: req.trx
  })

  const from = await PhoneNumber.query(qb => {
    qb.where('number', call.related('from').get('number'))
  }).fetch({
    transacting: req.trx
  })

  const response = new twiml.VoiceResponse()

  const code = await generateCode(req, {
    table: 'crm_enrollments'
  })

  const enrollment = await Enrollment.forge({
    team_id: campaign.get('team_id'),
    workflow_id: campaign.get('workflow_id'),
    contact_id: from.get('contact_id'),
    code
  }).save(null, {
    transacting: req.trx
  })

  const step = await Step.query(qb => {
    qb.where('parent_id', null)
    qb.orderBy('delta', 'asc')
  }).fetch({
    transacting: req.trx
  })

  response.redirect({
    method: 'POST'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/steps/${step.get('code')}`)

  return response.toString()

}

export default receive
