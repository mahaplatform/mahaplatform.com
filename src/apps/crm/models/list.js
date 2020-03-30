import Model from '../../../core/objects/model'
import Program from './program'
import Contact from './contact'

const List = new Model({

  tableName: 'crm_lists',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'list'
    },

    object_url: function() {
      return `/admin/crm/programs/${this.get('program_id')}/programs/${this.get('id')}`
    }

  },

  contacts() {
    return this.belongsToMany(Contact, 'crm_subscriptions', 'list_id', 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default List
