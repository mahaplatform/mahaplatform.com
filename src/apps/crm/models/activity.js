import Model from '@core/objects/model'
import Story from '@apps/maha/models/story'
import User from '@apps/maha/models/user'
import Program from './program'
import Contact from './contact'

const Activity = new Model({

  databaseName: 'maha',

  tableName: 'crm_activities',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
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
