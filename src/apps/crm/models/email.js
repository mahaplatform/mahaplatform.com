import Model from '../../../core/objects/model'
import MahaEmail from '../../maha/models/email'
import EmailResult from './email_result'
import Workflow from './workflow'
import Program from './program'
import Form from './form'

const Email = new Model({

  tableName: 'crm_emails',

  rules: {},

  virtuals: {},

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
