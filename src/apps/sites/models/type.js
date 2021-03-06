import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Site from './site'
import Item from './item'

const Type = new Model(knex, {

  databaseName: 'maha',

  tableName: 'sites_types',

  rules: {},

  virtuals: {},

  items: function() {
    return this.hasMany(Item, 'site_id')
  },

  site: function() {
    return this.belongsTo(Site, 'site_id')
  }

})

export default Type
