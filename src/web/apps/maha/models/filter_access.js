import Model from '../../../core/objects/model'
import Filter from './filter'
import Group from './group'
import User from './user'

const FilterAccess = new Model({

  tableName: 'maha_filter_accesses',

  rules: {},

  virtuals: {},

  filter() {
    return this.belongsTo(Filter, 'filter_id')
  },

  group() {
    return this.belongsTo(Group, 'group_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default FilterAccess
