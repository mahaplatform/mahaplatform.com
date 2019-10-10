import Model from '../../../core/objects/model'
import Subscription from './subscription'
import Contact from './contact'

const PhoneNumber = new Model({

  tableName: 'crm_phone_numbers',

  rules: {},

  virtuals: {

    international() {
      return `+1${this.get('number').replace(/[^\d]/g,'')}`
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
