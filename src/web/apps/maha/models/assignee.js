import Model from '../../../core/objects/model'
import Group from './group'
import User from './user'

const Assignee = new Model({

  tableName: 'maha_assignees',

  group() {
    return this.belongsTo(Group, 'group_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Assignee
