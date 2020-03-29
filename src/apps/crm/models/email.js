import Model from '../../../core/objects/model'
import MahaEmail from '../../maha/models/email'
import EmailResult from './email_result'
import Workflow from './workflow'
import Program from './program'
import Form from './form'

const Email = new Model({

  tableName: 'crm_emails',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('display_name')
    },

    object_type: function() {
      return 'email'
    },

    object_url: function() {
      return `/admin/crm/emails/${this.get('id')}`
    },

    display_name() {
      if(this.get('form_id')) return `${this.related('form').get('title')}: ${this.get('title')}`
      if(this.get('workflow_id')) return `${this.related('workflow').get('title')}: ${this.get('title')}`
      return this.get('title')
    }

  },

  emails() {
    return this.hasMany(MahaEmail, 'email_id')
  },

  form() {
    return this.belongsTo(Form, 'form_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  },

  results() {
    return this.hasOne(EmailResult, 'email_id')
  }

})

export default Email
