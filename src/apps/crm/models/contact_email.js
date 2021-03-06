import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Program from './program'
import Contact from './contact'

const ContactEmail = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_contact_emails',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default ContactEmail
