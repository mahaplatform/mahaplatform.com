import Grouping from '../../maha/models/grouping'
import Model from '@core/objects/model'
import Group from '../../maha/models/group'
import User from '../../maha/models/user'
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

  grouping: function() {
    return this.belongsTo(Grouping, 'grouping_id')
  },

  user: function() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Access
