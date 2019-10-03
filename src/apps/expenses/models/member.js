import Model from '../../../web/core/objects/model'
import User from '../../maha/models/user'
import MemberType from './member_type'
import Project from './project'

const Member = new Model({

  tableName: 'expenses_members',

  rules: {
    user_id: ['required'],
    project_id: ['required'],
    member_type_id: ['required']
  },

  virtuals: {

    full_name() {
      return 'full_name'
    }

  },

  member_type() {
    return this.belongsTo(MemberType, 'member_type_id')
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Member
