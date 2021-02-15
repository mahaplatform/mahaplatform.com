import { lookupNumber } from '@apps/maha/services/phone_numbers'
import PhoneNumber from '@apps/crm/models/phone_number'
import generateCode from '@core/utils/generate_code'
import Contact from '@apps/crm/models/contact'

const getPhoneNumber = async (req, { number }) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
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
    undelivered_count: 0,
    can_text: true
  }).save(null, {
    transacting: req.trx
  })

  await new_phone_number.load(['contact'], {
    transacting: req.trx
  })

  return new_phone_number

}

export default getPhoneNumber
