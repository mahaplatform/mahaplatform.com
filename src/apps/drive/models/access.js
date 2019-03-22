import { Model, User, Group } from 'maha'
import AccessType from './access_type'
import Item from './item'

const Access = new Model({

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

  user: function() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Access
