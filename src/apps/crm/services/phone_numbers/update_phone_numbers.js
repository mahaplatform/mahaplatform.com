import { parsePhoneNumberFromString } from 'libphonenumber-js'
import generateCode from '@core/utils/generate_code'
import PhoneNumber from '@apps/crm/models/phone_number'
import moment from 'moment'

export const getFormattedNumber = (value) => {
  const parsed = parsePhoneNumberFromString(value, 'US')
  if(!parsed) return null
  const number = [parsed.number]
  if(parsed.ext) number.push(parsed.ext)
  return number.join('x')
}

const getIsPrimary = (phone_number, existing, found) => {
  if(phone_number.is_primary !== undefined) return phone_number.is_primary
  if(found && found.get('is_primary')) return true
  return existing.length === 0
}

const updatePhoneNumbers = async (req, { contact, phone_numbers, removing }) => {

  const existing = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('contact_id', contact.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  phone_numbers = phone_numbers.map(phone_number => {
    const formatted = getFormattedNumber(phone_number.number)
    const found = existing.find(item => {
      return item.get('id') === phone_number.id || item.get('number') === formatted
    })
    return {
      ...phone_number,
      is_primary: getIsPrimary(phone_number, existing, found),
      number: formatted,
      id: found ? found.get('id') : undefined
    }
  })

  const add = phone_numbers.filter(phone_number => {
    return phone_number.id === undefined
  })

  const update = phone_numbers.filter(phone_number => {
    return phone_number.id !== undefined
  })

  const remove = removing !== false ? existing.filter(phone_number => {
    return phone_numbers.find(number => {
      return number.id === phone_number.get('id')
    }) === undefined
  }) : []

  const added = add.length > 0 ? await Promise.mapSeries(add, async (phone_number) => {
    const code = await generateCode(req, {
      table: 'crm_phone_numbers'
    })
    return await PhoneNumber.forge({
      team_id: req.team.get('id'),
      contact_id: contact.get('id'),
      code,
      number: phone_number.number,
      is_primary: phone_number.is_primary,
      undelivered_count: 0,
      can_text: true
    }).save(null, {
      transacting: req.trx
    })
  }) : []

  const updated = update.length > 0 ? await Promise.mapSeries(update, async (phone_number) => {
    const number = existing.find(item => {
      return item.get('id') === phone_number.id
    })
    return await number.save({
      ...number.get('number') !== phone_number.number ? { can_text: true, undelivered_count: 0 } : {},
      deleted_at: null,
      number: phone_number.number,
      is_primary: phone_number.is_primary
    }, {
      transacting: req.trx,
      patch: true
    })
  }) : []

  if(remove.length > 0) {
    await Promise.mapSeries(remove, async (phone_number) => {
      await phone_number.save({
        is_primary: false,
        deleted_at: moment()
      },{
        transacting: req.trx,
        patch: true
      })
    })
  }

  return [
    ...added,
    ...updated
  ]

}

export default updatePhoneNumbers
