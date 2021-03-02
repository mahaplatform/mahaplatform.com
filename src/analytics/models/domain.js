import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'
import Referer from './referer'
import Page from './page'

const Domain = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'domains',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  pages() {
    return this.hasMany(Page, 'domain_id')
  },

  referers() {
    return this.hasMany(Referer, 'domain_id')
  }

})

export default Domain
