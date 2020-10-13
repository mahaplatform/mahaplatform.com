import Model from '../../../core/objects/model'
import User from './user'

const Group = new Model({

  tableName: 'maha_groups',

  rules: {
    title: ['required', 'unique']
  },

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'group'
    },

    object_url: function() {
      return `/team/groups/${this.get('id')}`
    }

  },

  leader() {
    return this.belongsTo(User, 'leader_id')
  },

  users() {
    return this.belongsToMany(User, 'maha_users_groups', 'group_id', 'user_id')
  }

})

export default Group
