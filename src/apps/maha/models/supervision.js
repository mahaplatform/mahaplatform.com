import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import User from './user'

const Supervision = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_supervisions',

  supervisor() {
    return this.belongsTo(User, 'supervisor_id')
  },

  employee() {
    return this.belongsTo(User, 'employee_id')
  }

})

export default Supervision
