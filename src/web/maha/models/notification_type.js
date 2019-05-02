import collectObjects from '../core/utils/collect_objects'
import Model from '../core/objects/model'
import App from './app'
import _ from 'lodash'

let data = null

const getData = () => {
  if(data) return data
  data = collectObjects('admin/notifications.js').reduce((notifications, notification) => [
    ...notifications,
    ...notification.default.map(n => ({
      ...n,
      app: notification.config.code
    }))
  ], [])
  return data
}

const NotificationType = new Model({

  tableName: 'maha_notification_types',

  virtuals: {

    app_code: function() {
      return this.related('app').id ? this.related('app').get('code') : 'maha'
    },

    data: function() {
      return _.find(getData(), {
        code: this.get('code'),
        app: this.get('app_code')
      })
    }

  },

  app() {
    return this.belongsTo(App, 'app_id')
  }

})

export default NotificationType
