import Model from '../core/objects/model'
import User from './user'

const Supervision = new Model({

  tableName: 'maha_supervisions',

  supervisor() {
    return this.belongsTo(User, 'supervisor_id')
  },

  employee() {
    return this.belongsTo(User, 'employee_id')
  }

})

export default Supervision
