import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Asset from '@apps/maha/models/asset'
import Program from './program'
import Contact from './contact'

const ContactCall = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_contact_calls',

  rules: {},

  virtuals: {},

  attachments() {
    return this.belongsToMany(Asset, 'crm_calls_assets','note_id','asset_id')
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default ContactCall
