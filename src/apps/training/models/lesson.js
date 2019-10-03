import Model from '../../../core/objects/model'
import Training from './training'
import Quiz from './quiz'

const Lesson = new Model({

  tableName: 'training_lessons',

  rules: {},

  virtuals: {},

  training: function() {
    return this.belongsTo(Training, 'training_id')
  },

  quiz() {
    return this.hasOne(Quiz, 'lesson_id')
  }

})

export default Lesson
