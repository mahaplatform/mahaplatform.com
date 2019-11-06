import Model from '../../../core/objects/model'
import Program from './program'
import Contact from './contact'

const ContactCall = new Model({

  tableName: 'crm_contact_calls',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default ContactCall
