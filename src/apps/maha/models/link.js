import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Service from './service'

const Listening = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_links',

  belongsToTeam: false,

  rules: {},

  service() {
    return this.belongsTo(Service, 'service_id')
  }

})

export default Listening
