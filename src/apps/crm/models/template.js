import Model from '../../../core/objects/model'
import Program from '../../maha/models/program'

const Template = new Model({

  tableName: 'crm_templates',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Template
