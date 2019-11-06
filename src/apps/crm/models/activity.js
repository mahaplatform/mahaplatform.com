import Model from '../../../core/objects/model'
import Story from '../../maha/models/story'
import User from '../../maha/models/user'
import Email from './contact_email'
import Call from './contact_call'
import Note from './contact_note'
import Program from './program'
import Contact from './contact'

const Activity = new Model({

  tableName: 'crm_activities',

  rules: {},

  virtuals: {},

  call() {
    return this.belongsTo(Call, 'contact_call_id')
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  email() {
    return this.belongsTo(Email, 'contact_email_id')
  },

  note() {
    return this.belongsTo(Note, 'contact_note_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  story() {
    return this.belongsTo(Story, 'story_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }


})

export default Activity
