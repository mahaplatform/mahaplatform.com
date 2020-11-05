import Model from '@core/objects/model'
import User from './user'

const Supervisor = new Model({

  tableName: 'maha_supervisors',

  rules: {
    user_id: 'required'
  },

  virtuals: {

    object_text: function() {
      return this.related('user').get('full_name')
    },

    object_type: function() {
      return 'supervisor'
    },

    object_url: function() {
      return `/team/supervisors/${this.get('id')}`
    }

  },

  employees() {
    return this.belongsToMany(User, 'maha_supervisions', 'supervisor_id', 'employee_id', 'user_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Supervisor
