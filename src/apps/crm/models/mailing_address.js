import Model from '@core/objects/model'
import Subscription from './subscription'
import Contact from './contact'

const MailingAddress = new Model({

  tableName: 'crm_mailing_addresses',

  rules: {},

  virtuals: {

    fulladdress() {
      return [
        ...this.get('street_1') ? [this.get('street_1')] : [],
        ...this.get('street_2') ? [this.get('street_2')] : [],
        [
          ...this.get('city') ? [this.get('city')] : [],
          ...this.get('state_province') ? [this.get('state_province')] : []
        ].join(' '),
        ...this.get('postal_code') ? [this.get('postal_code')] : []
      ].join(', ')
    }

  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  subscriptions() {
    return this.hasMany(Subscription, 'address_id')
  }

})

export default MailingAddress
