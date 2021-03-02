import Origin from './origin'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Type from './type'

const Site = new Model(knex, {

  databaseName: 'maha',

  tableName: 'sites_sites',

  rules: {},

  virtuals: {},

  origins: function() {
    return this.hasMany(Origin, 'site_id')
  },

  types: function() {
    return this.hasMany(Type, 'site_id')
  }

})

export default Site
