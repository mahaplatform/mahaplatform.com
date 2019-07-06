import Attachment from '../../maha/models/attachment'
import Model from '../../../core/objects/model'
import Assignment from './assignment'
import Offering from './offering'
import Lesson from './lesson'

const Training = new Model({

  tableName: 'learning_trainings',

  rules: {},

  virtuals: {},

  assignments() {
    return this.hasMany(Assignment, 'training_id')
  },

  lessons() {
    return this.hasMany(Lesson, 'training_id')
  },

  materials() {
    return this.morphMany(Attachment, 'attachable')
  },

  offerings() {
    return this.belongsTo(Offering, 'training_id')
  }

})

export default Training
