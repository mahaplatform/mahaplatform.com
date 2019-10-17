import Model from '../../../core/objects/model'
import Workflow from './workflow'
import Contact from './contact'

const Enrollment = new Model({

  tableName: 'crm_enrollments',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default Enrollment
