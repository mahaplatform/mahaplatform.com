import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
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
  },

  verification() {
    return this.belongsTo(Asset, 'verification_id')
  }

})

export default Fulfillment
