import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import Fulfillment from './fulfillment'
import Assigning from './assigning'
import Option from './option'

const Assignment = new Model({

  tableName: 'training_assignments',

  rules: {},

  virtuals: {

    is_configured() {
      return this.get('option_id') !== null
    }

  },

  assigning() {
    return this.belongsTo(Assigning, 'assigning_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  },

  fulfillments() {
    return this.hasMany(Fulfillment, 'assignment_id')
  },

  option() {
    return this.belongsTo(Option, 'option_id')
  }

})

export default Assignment
