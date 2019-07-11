import Model from '../../../core/objects/model'
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
  }

})

export default Fulfillment
