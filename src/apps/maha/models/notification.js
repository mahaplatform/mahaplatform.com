import NotificationType from './notification_type'
import Model from '../core/objects/model'
import App from './app'
import Story from './story'
import User from './user'

const Notification = new Model({

  tableName: 'maha_notifications',

  rules: {
    user_id: ['required']
  },

  virtuals: {

    type: function() {
      return `${this.related('app').get('code')}:${this.related('notification_type').get('code')}`
    }

  },

  app() {
    return this.belongsTo(App, 'app_id')
  },

  notification_type() {
    return this.belongsTo(NotificationType, 'notification_type_id')
  },

  object_owner() {
    return this.belongsTo(User, 'object_owner_id')
  },

  object() {
    return this.morphTo('object', ['object_table', 'object_id'])
  },

  story() {
    return this.belongsTo(Story, 'story_id')
  },

  subject() {
    return this.belongsTo(User, 'subject_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Notification
