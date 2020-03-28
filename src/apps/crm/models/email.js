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

    display_name() {
      const form = this.related('form')
      const workflow = this.related('workflow')
      if(form) return `${form.get('title')}: ${this.get('title')}`
      if(workflow) return `${workflow.get('title')}: ${this.get('title')}`
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
