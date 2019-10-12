import Model from '../../../core/objects/model'
import Subscription from './subscription'
import Contact from './contact'

const PhoneNumber = new Model({

  tableName: 'crm_phone_numbers',

  rules: {},

  virtuals: {

    friendly() {
      const parts = this.get('number').match(/\+1(\d{3})(\d{3})(\d{4})/)
      return `(${parts[1]}) ${parts[2]}-${parts[3]}`
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
