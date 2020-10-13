import Model from '../../../core/objects/model'
import Program from './program'

const Sender = new Model({

  tableName: 'crm_senders',

  rules: {
    email: 'unique'
  },

  virtuals: {

    object_text: function() {
      return this.get('email')
    },

    object_type: function() {
      return 'sender'
    },

    object_url: function() {
      return `/crm/programs/${this.get('program_id')}/senders/${this.get('id')}`
    },

    rfc822: function() {
      return `${this.get('name')} <${this.get('email')}>`
    }

  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Sender
