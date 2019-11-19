import Model from '../../../core/objects/model'
import Member from './member'

const Project = new Model({

  tableName: 'finance_projects',

  rules: {
    title: ['required', 'unique']
  },

  virtuals: {

    display: function() {
      return `${this.get('integration').project_code} - ${this.get('title')}`
    },

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
  },

  tax_project() {
    return this.belongsTo(Project, 'tax_project_id')
  }

})

export default Project
