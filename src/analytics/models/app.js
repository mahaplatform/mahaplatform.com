import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Session from './session'

const App = new Model(knex, {

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
