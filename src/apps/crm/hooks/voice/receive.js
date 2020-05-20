import { lookupNumber } from '../../../maha/services/phone_numbers'
import { enrollInCampaign } from '../../services/voice_campaigns'
import generateCode from '../../../../core/utils/generate_code'
import { executeWorkflow } from '../../services/workflows'
import VoiceCampaign from '../../models/voice_campaign'
import PhoneNumber from '../../models/phone_number'
import Contact from '../../models/contact'

const getPhoneNumber = async (req, { number }) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', number)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(phone_number) return phone_number

  const caller = await lookupNumber(req, {
    number
  })

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code,
    first_name: caller.first_name,
    last_name: caller.last_name
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

  const from = await getPhoneNumber(req, {
    number: call.related('from').get('number')
  })

  await phone_number.load(['program'], {
    transacting: req.trx
  })

  await call.save({
    program_id: phone_number.related('program').get('id'),
    phone_number_id: from.get('id')
  },{
    transacting: req.trx
  })

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('phone_number_id', phone_number.get('id'))
    qb.where('direction', 'inbound')
    qb.where('status', 'active')
  }).fetch({
    transacting: req.trx
  })

  if(!voice_campaign) return

  const enrollment = await enrollInCampaign(req, {
    voice_campaign,
    call,
    contact: from.related('contact')
  })

  const result = await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    code: req.params.code,
    execute: req.params.verb !== 'next',
    response: req.params.verb === 'gather' ? req.body.Digits : null
  })

  return result.twiml

}

export default receive
