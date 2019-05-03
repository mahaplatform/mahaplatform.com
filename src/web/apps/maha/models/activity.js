import Model from '../../../core/objects/model'
import App from './app'
import Story from './story'
import User from './user'

const Activity = new Model({

  tableName: 'maha_activities',

  rules: {
    user_id: ['required']
  },

  app() {
    return this.belongsTo(App, 'app_id')
  },

  object_owner() {
    return this.belongsTo(User, 'object_owner_id')
  },

  story() {
    return this.belongsTo(Story, 'story_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Activity
