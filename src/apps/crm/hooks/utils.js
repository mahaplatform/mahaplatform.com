import generateCode from '../../../core/utils/generate_code'
import PhoneNumber from '../models/phone_number'
import Contact from '../models/contact'

export const getContact = async (req, { team_id, number }) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', number)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(phone_number) return phone_number.related('contact')

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id,
    code,
    phone: number
  }).save(null, {
    transacting: req.trx
  })

  const new_phone_number = await PhoneNumber.forge({
    team_id,
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

  return contact

}
