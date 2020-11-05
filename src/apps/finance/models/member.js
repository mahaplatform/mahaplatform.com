import Model from '@core/objects/model'
import User from '@apps/maha/models/user'
import Project from './project'

const Member = new Model({

  tableName: 'finance_members',

  rules: {
    user_id: ['required'],
    project_id: ['required'],
    type: ['required']
  },

  virtuals: {

    full_name() {
      return 'full_name'
    }

  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Member
