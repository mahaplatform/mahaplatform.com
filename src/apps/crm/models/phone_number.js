import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Model from '@core/objects/model'
import Subscription from './subscription'
import Contact from './contact'

const PhoneNumber = new Model({

  databaseName: 'maha',

  tableName: 'crm_phone_numbers',

  rules: {},

  virtuals: {

    formatted() {
      const phoneNumber = parsePhoneNumberFromString(this.get('number'), 'US')
      return phoneNumber.formatNational().replace(/\s/,'-').replace(/[()]/g, '')
    },

    spoken() {
      const phoneNumber = parsePhoneNumberFromString(this.get('number'), 'US')
      const parts = []
      parts.push('area code')
      parts.push(phoneNumber.nationalNumber.split('').join(' '))
      if(!phoneNumber.ext) return parts.join(' ')
      parts.push('extension')
      parts.push(phoneNumber.ext.split('').join(' '))
      return parts.join(' ')
    }

  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  subscriptions() {
    return this.hasMany(Subscription, 'email_address_id')
  }

})

export default PhoneNumber
