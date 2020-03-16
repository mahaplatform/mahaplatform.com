import generateCode from '../../../../core/utils/generate_code'
import VoiceCampaign from '../../models/voice_campaign'
import PhoneNumber from '../../models/phone_number'
import Enrollment from '../../models/enrollment'
import Contact from '../../models/contact'
import { twiml } from 'twilio'

const getPhoneNumber = async (req, { number }) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', number)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(phone_number) return phone_number

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code
  }).save(null, {
    transacting: req.trx
  })

  const new_phone_number = await PhoneNumber.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    number,
    is_primary: true,
    is_valid: true
  }).save(null, {
    transacting: req.trx
  })

  await new_phone_number.load(['contact'], {
    transacting: req.trx
  })

  return new_phone_number

}

const receive = async (req, { call, phone_number }) => {

  const campaign = await VoiceCampaign.query(qb => {
    qb.where('phone_number_id', phone_number.get('id'))
  }).fetch({
    transacting: req.trx
  })

  const from = await getPhoneNumber(req, {
    campaign,
    number: call.related('from').get('number')
  })

  const response = new twiml.VoiceResponse()

  const code = await generateCode(req, {
    table: 'crm_enrollments'
  })

  const enrollment = await Enrollment.forge({
    team_id: campaign.get('team_id'),
    voice_campaign_id: campaign.get('id'),
    contact_id: from.get('contact_id'),
    code,
    actions: [],
    was_converted: false
  }).save(null, {
    transacting: req.trx
  })

  const step = campaign.get('steps').find(step => {
    return step.parent === null && step.delta === 0
  })

  response.redirect({
    method: 'GET'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/steps/${step.code}`)

  return response.toString()

}

export default receive
