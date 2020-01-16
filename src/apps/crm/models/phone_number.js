import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Model from '../../../core/objects/model'
import Subscription from './subscription'
import Contact from './contact'

const PhoneNumber = new Model({

  tableName: 'crm_phone_numbers',

  rules: {},

  virtuals: {

    formatted() {
      const phoneNumber = parsePhoneNumberFromString(this.get('number'), 'US')
      return phoneNumber.formatNational()
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
