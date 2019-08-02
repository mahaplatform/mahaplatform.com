import Model from '../../../core/objects/model'
import Contact from './contact'
import Email from './email'
import Call from './call'
import Note from './note'

const Activity = new Model({

  tableName: 'crm_activities',

  rules: {},

  virtuals: {},

  call() {
    return this.hasOne(Call, 'call_id')
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  email() {
    return this.hasOne(Email, 'email_id')
  },

  note() {
    return this.hasOne(Note, 'note_id')
  }


})

export default Activity
