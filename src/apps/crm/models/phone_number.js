import { formatPhoneNumber, spokenPhoneNumber } from '@core/services/phone_numbers'
import Subscription from './subscription'
import Model from '@core/objects/model'
import Contact from './contact'

const PhoneNumber = new Model({

  databaseName: 'maha',

  tableName: 'crm_phone_numbers',

  rules: {},

  virtuals: {

    formatted() {
      return formatPhoneNumber(this.get('number'))
    },

    spoken() {
      return spokenPhoneNumber(this.get('number'))
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
