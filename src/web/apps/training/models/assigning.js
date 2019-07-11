import Assignment from './assignment'
import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import Option from './option'

const Assigning = new Model({

  tableName: 'training_assignings',

  rules: {},

  virtuals: {},

  assigned_by() {
    return this.belongsTo(User, 'assigned_by_id')
  },

  assignments() {
    return this.hasMany(Assignment, 'assigning_id')
  },

  options() {
    return this.hasMany(Option, 'assigning_id')
  }

})

export default Assigning
