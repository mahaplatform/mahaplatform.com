import collectObjects from '../../../web/core/utils/collect_objects'
import Model from '../../../web/core/objects/model'
import App from './app'
import _ from 'lodash'

let data = null

const getData = () => {
  if(data) return data
  data = collectObjects('admin/alerts.js').reduce((alerts, alert) => [
    ...alerts,
    ...alert.default.map(a => ({
      ...a,
      app: alert.config.code
    }))
  ], [])
  return data
}

const Alert = new Model({

  tableName: 'maha_alerts',

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

export default Alert
