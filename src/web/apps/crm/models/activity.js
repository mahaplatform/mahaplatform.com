import Model from '../../../core/objects/model'
import Story from '../../maha/models/story'
import User from '../../maha/models/user'
import Contact from './contact'
import Email from './email'
import Call from './call'
import Note from './note'

const Activity = new Model({

  tableName: 'crm_activities',

  rules: {},

  virtuals: {},

  call() {
    return this.belongsTo(Call, 'call_id')
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  email() {
    return this.belongsTo(Email, 'email_id')
  },

  note() {
    return this.belongsTo(Note, 'note_id')
  },

  story() {
    return this.belongsTo(Story, 'story_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }


})

export default Activity
