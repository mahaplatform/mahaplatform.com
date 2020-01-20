import { parsePhoneNumberFromString } from 'libphonenumber-js'
import PhoneNumber from '../models/phone_number'

const getFormattedNumber = (value) => {
  const parsed = parsePhoneNumberFromString(value, 'US')
  const number = [parsed.number]
  if(parsed.ext) number.push(parsed.ext)
  return number.join('x')
}

export const updatePhoneNumbers = async (req, { contact, phone_numbers }) => {

  const add = phone_numbers.filter(phone_number => {
    return phone_number.id === undefined
  })

  const update = phone_numbers.filter(phone_number => {
    return phone_number.id !== undefined
  })

  const remove = contact.related('phone_numbers').toArray().filter(phone_number => {
    return phone_numbers.find(number => {
      return number.id === phone_number.get('id')
    }) === undefined
  })

  if(add.length > 0) {
    await Promise.mapSeries(add, async (phone_number) => {
      await PhoneNumber.forge({
        team_id: req.team.get('id'),
        contact_id: contact.get('id'),
        number: getFormattedNumber(phone_number.number),
        is_primary: phone_number.is_primary,
        is_valid: true
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  if(update.length > 0) {
    await Promise.mapSeries(update, async (phone_number) => {
      const number = contact.related('phone_numbers').find(item => {
        return item.get('id') === phone_number.id
      })
      await number.save({
        number: getFormattedNumber(phone_number.number),
        is_primary: phone_number.is_primary
      }, {
        transacting: req.trx
      })
    })
  }

  if(remove.length > 0) {
    await Promise.mapSeries(remove, async (phone_number) => {
      await phone_number.destroy({
        transacting: req.trx
      })
    })
  }

}
