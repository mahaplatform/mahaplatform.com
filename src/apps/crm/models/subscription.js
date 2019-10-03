import Model from '../../../core/objects/model'
import EmailAddress from './email_address'
import List from './list'

const Subscription = new Model({

  tableName: 'crm_subscriptions',

  rules: {},

  virtuals: {},

  email_address() {
    return this.belongsTo(EmailAddress, 'email_address_id')
  },

  list() {
    return this.belongsTo(List, 'list_id')
  }

})

export default Subscription
