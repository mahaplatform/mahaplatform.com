import Grouping from '@apps/maha/models/grouping'
import Group from '@apps/maha/models/group'
import User from '@apps/maha/models/user'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Program from './program'

const ProgramAccess = new Model(knex, {

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
