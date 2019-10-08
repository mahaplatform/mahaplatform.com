import Model from '../../../core/objects/model'
import Program from './program'

const Campaign = new Model({

  tableName: 'crm_campaigns',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Campaign
