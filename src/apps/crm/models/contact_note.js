import Model from '../../../core/objects/model'
import Program from './program'
import Contact from './contact'

const ContactNote = new Model({

  tableName: 'crm_contact_notes',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default ContactNote
