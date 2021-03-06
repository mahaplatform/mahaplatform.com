import Grouping from '@apps/maha/models/grouping'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Group from '@apps/maha/models/group'
import User from '@apps/maha/models/user'
import AccessType from './access_type'
import Item from './item'

const Access = new Model(knex, {

  databaseName: 'maha',

  tableName: 'drive_access',

  hasTimestamps: false,

  access_type: function() {
    return this.belongsTo(AccessType, 'access_type_id')
  },

  item: function() {
    return this.belongsTo(Item, 'code')
  },

  group: function() {
    return this.belongsTo(Group, 'group_id')
  },

  grouping: function() {
    return this.belongsTo(Grouping, 'grouping_id')
  },

  user: function() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Access
