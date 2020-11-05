import Model from '@core/objects/model'
import Asset from '@apps/maha/models/asset'
import Program from './program'
import Contact from './contact'

const ContactNote = new Model({

  tableName: 'crm_contact_notes',

  rules: {},

  virtuals: {},

  attachments() {
    return this.belongsToMany(Asset, 'crm_notes_assets','note_id','asset_id')
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default ContactNote
