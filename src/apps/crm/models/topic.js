import Model from '../../../core/objects/model'
import Program from '../../maha/models/program'

const Topic = new Model({

  tableName: 'crm_topics',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Topic
