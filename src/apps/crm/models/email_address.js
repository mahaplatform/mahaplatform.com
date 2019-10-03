import Model from '../../../web/core/objects/model'
import Subscription from './subscription'
import Contact from './contact'

const EmailAddress = new Model({

  tableName: 'crm_email_addresses',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  subscriptions() {
    return this.hasMany(Subscription, 'email_address_id')
  }

})

export default EmailAddress
