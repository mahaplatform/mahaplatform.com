import Model from '@core/objects/model'
import Grouping from '@apps/maha/models/grouping'
import Program from './program'
import Group from '@apps/maha/models/group'
import User from '@apps/maha/models/user'

const ProgramAccess = new Model({

  databaseName: 'maha',

  tableName: 'crm_program_accesses',

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
