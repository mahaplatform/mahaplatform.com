import Model from '../../../core/objects/model'
import Training from './training'

const Lesson = new Model({

  tableName: 'learning_lessons',

  rules: {},

  virtuals: {},

  training: function() {
    return this.belongsTo(Training, 'training_id')
  }

})

export default Lesson
