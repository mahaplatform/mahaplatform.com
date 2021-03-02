import Story from '@apps/maha/models/story'
import User from '@apps/maha/models/user'
import Call from '@apps/maha/models/call'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const CallActivity = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_call_activities',

  rules: {},

  virtuals: {},

  call() {
    return this.belongsTo(Call, 'call_id')
  },

  story() {
    return this.belongsTo(Story, 'story_id')
  },

  to_user() {
    return this.belongsTo(User, 'to_user_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default CallActivity
