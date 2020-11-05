import generateCode from '@core/utils/generate_code'
import PhoneNumber from '@apps/crm/models/phone_number'
import Contact from '@apps/crm/models/contact'

export const getContact = async (req, params) => {

  const { number } = params

  const team_id = params.team_id || req.team.get('id')

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('team_id', team_id)
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
    code
  }).save(null, {
    transacting: req.trx
  })

  const new_phone_number = await PhoneNumber.forge({
    team_id,
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

  return contact

}
