import Model from '../../../core/objects/model'
import Program from './program'

const Sender = new Model({

  tableName: 'crm_senders',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Sender
