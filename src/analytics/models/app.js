import Model from '@core/analytics/objects/model'
import Session from './session'

const App = new Model({

  databaseName: 'analytics',

  tableName: 'apps',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'app_id')
  }

})

export default App
