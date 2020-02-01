import Model from '../../../core/objects/model'
import Workflow from './workflow'
import Program from './program'
import Form from './form'

const Email = new Model({

  tableName: 'crm_emails',

  rules: {},

  virtuals: {},

  form() {
    return this.belongsTo(Form, 'form_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default Email
