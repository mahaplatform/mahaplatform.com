import Model from '../../../core/objects/model'
import Training from './training'

const Offering = new Model({

  tableName: 'training_offerings',

  rules: {},

  virtuals: {},

  training() {
    return this.belongsTo(Training, 'training_id')
  }

})

export default Offering
