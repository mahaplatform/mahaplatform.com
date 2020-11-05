import Model from '@core/objects/model'
import Fulfillment from './fulfillment'
import Training from './training'

const Offering = new Model({

  tableName: 'training_offerings',

  rules: {},

  virtuals: {

    fulfillments_count() {
      return this.related('fulfillments').length
    }

  },

  fulfillments() {
    return this.hasMany(Fulfillment, 'offering_id')
  },

  training() {
    return this.belongsTo(Training, 'training_id')
  }

})

export default Offering
