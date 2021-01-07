import Model from '@core/objects/model'
import Assigning from './assigning'
import Training from './training'

const Option = new Model({

  databaseName: 'maha',

  tableName: 'training_options',

  rules: {},

  virtuals: {},

  assigning() {
    return this.belongsTo(Assigning, 'assigning_id')
  },

  trainings() {
    return this.belongsToMany(Training, 'training_options_trainings', 'option_id', 'training_id')
  }

})

export default Option
