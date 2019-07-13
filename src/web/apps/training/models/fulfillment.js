import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import Training from './training'
import Offering from './offering'

const Fulfillment = new Model({

  tableName: 'training_fulfillments',

  rules: {},

  virtuals: {},

  offering() {
    return this.belongsTo(Offering, 'offering_id')
  },

  training() {
    return this.belongsTo(Training, 'training_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Fulfillment
