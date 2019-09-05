import Model from '../../../core/objects/model'
import EmailAddress from './email_address'
import Program from '../../maha/models/program'

const List = new Model({

  tableName: 'crm_lists',

  rules: {},

  virtuals: {},

  email_addresses() {
    return this.belongsToMany(EmailAddress, 'crm_subscriptions', 'list_id', 'email_address_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default List
