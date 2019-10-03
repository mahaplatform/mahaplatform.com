import Model from '../../../web/core/objects/model'
import FilterAccess from './filter_access'
import User from './user'

const Filter = new Model({

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
