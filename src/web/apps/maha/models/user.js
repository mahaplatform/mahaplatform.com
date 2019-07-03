import Model from '../../../core/objects/model'
import bcrypt from 'bcrypt-nodejs'
import Asset from './asset'
import Group from './group'
import Role from './role'
import SecurityQuestion from './security_question'
import Supervision from './supervision'
import Team from './team'
import Session from './session'

const User = new Model({

  tableName: 'maha_users',

  rules: {
    first_name: 'required',
    last_name: 'required',
    email: ['required', 'email', 'unique']
  },

  virtuals: {

    full_name: function() {
      return this.get('first_name') + ' ' + this.get('last_name')
    },

    f_last: function() {
      return this.get('first_initial') + this.get('last_name').toLowerCase()
    },

    first_initial: function() {
      return this.get('first_name') ? this.get('first_name')[0].toLowerCase() : ''
    },

    group_ids: function() {
      return this.related('groups').map(group => group.id)
    },

    initials: function() {
      return this.get('first_initial') + this.get('last_initial')
    },

    last_initial: function() {
      return this.get('last_name') ? this.get('last_name')[0].toLowerCase() : ''
    },

    object_text: function() {
      return this.get('full_name')
    },

    object_type: function() {
      return 'user'
    },

    object_url: function() {
      return `/admin/team/users/${this.get('id')}`
    },

    password: {
      get() {},
      set(value) {
        const password_salt = bcrypt.genSaltSync(10)
        this.set('password_salt', password_salt)
        this.set('password_hash', bcrypt.hashSync(value, password_salt))
      }
    },

    rfc822: function() {
      return `${this.get('full_name')} <${this.get('email')}>`
    },

    role_ids: function() {
      return this.related('roles').map(role => role.id)
    },

    supervisor_ids: function() {
      return this.related('supervisors').map(supervisor => supervisor.id)
    },

    status: function() {
      if(this.get('activated_at') === null) return 'inactive'
      if(!this.get('is_active')) return 'disabled'
      return 'active'
    }

  },

  sessions() {
    return this.hasMany(Session, 'user_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  security_question() {
    return this.belongsTo(SecurityQuestion, 'security_question_id')
  },

  groups() {
    return this.belongsToMany(Group, 'maha_users_groups', 'user_id', 'group_id')
  },

  roles() {
    return this.belongsToMany(Role, 'maha_users_roles', 'user_id', 'role_id')
  },

  supervisors: function() {
    return this.hasMany(User).through(Supervision, 'id', 'employee_id', 'supervisor_id')
  },

  team() {
    return this.belongsTo(Team, 'team_id')
  },

  authenticate(password) {
    return this.get('password_hash') === bcrypt.hashSync(password, this.get('password_salt'))
  }

})

export default User
