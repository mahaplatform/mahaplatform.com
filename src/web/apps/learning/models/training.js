import Assignment from './assignment'
import Offering from './offering'
import Model from '../../../core/objects/model'

const Training = new Model({

  tableName: 'learning_trainings',

  rules: {},

  virtuals: {},

  assignments() {
    return this.hasMany(Assignment, 'training_id')
  },

  offerings() {
    return this.hasMany(Offering, 'training_id')
  }

})

export default Training
