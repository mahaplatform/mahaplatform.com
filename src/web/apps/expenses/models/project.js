import Model from '../../../core/objects/model'
import Member from './member'

const Project = new Model({

  tableName: 'expenses_projects',

  rules: {
    title: ['required', 'unique']
  },

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'project'
    },

    object_url: function() {
      return `/admin/expenses/projects/${this.get('id')}`
    }

  },

  members() {
    return this.hasMany(Member, 'project_id')
  }

})

export default Project
