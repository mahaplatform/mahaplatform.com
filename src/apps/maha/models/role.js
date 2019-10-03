import Model from '../../../web/core/objects/model'
import App from './app'
import Right from './right'
import User from './user'

const Role = new Model({

  tableName: 'maha_roles',

  rules: {
    title: ['required', 'unique'],
    description: 'required'
  },

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'role'
    },

    object_url: function() {
      return `/admin/team/roles/${this.get('id')}`
    }

  },

  apps() {
    return this.belongsToMany(App, 'maha_roles_apps', 'role_id', 'app_id')
  },

  rights() {
    return this.belongsToMany(Right, 'maha_roles_rights', 'role_id', 'right_id')
  },

  users() {
    return this.belongsToMany(User, 'maha_users_roles', 'role_id', 'user_id')
  }

})

export default Role
