import Model from '../../../core/objects/model'
import Program from './program'
import Contact from './contact'

const List = new Model({

  tableName: 'crm_lists',

  rules: {},

  virtuals: {},

  contacts() {
    return this.belongsToMany(Contact, 'crm_subscriptions', 'list_id', 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default List
