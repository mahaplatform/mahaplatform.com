import Model from '../../../web/core/objects/model'
import Program from './program'

const Template = new Model({

  tableName: 'crm_templates',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Template
