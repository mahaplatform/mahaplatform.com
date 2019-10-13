import Model from '../../../core/objects/model'
import Grouping from './grouping'
import Program from './program'
import Group from './group'
import User from './user'

const ProgramAccess = new Model({

  tableName: 'maha_program_accesses',

  rules: {},

  virtuals: {},

  grouping() {
    return this.belongsTo(Grouping, 'grouping_id')
  },

  group() {
    return this.belongsTo(Group, 'group_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default ProgramAccess
