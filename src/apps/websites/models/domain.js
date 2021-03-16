import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Record from './record'

const Domain = new Model(knex, {

  databaseName: 'maha',

  tableName: 'websites_domains',

  rules: {},

  virtuals: {},

  records() {
    return this.hasMany(Record, 'domain_id')
  }

})

export default Domain
