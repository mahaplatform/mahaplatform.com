import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import FilterAccess from './filter_access'
import User from './user'

const Filter = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_filters',

  rules: {},

  virtuals: {},

  accesses() {
    return this.hasMany(FilterAccess, 'filter_id')
  },

  owner() {
    return this.belongsTo(User, 'owner_id')
  }

})

export default Filter
