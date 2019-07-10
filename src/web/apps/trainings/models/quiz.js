import Administration from './administration'
import Model from '../../../core/objects/model'
import Question from './question'
import Training from './training'
import Lesson from './lesson'

const Quiz = new Model({

  tableName: 'training_quizes',

  rules: {},

  virtuals: {

    questions_count() {
      return this.related('questions').length
    }

  },

  administrations() {
    return this.hasMany(Administration, 'quiz_id')
  },

  lesson() {
    return this.belongsTo(Lesson, 'quiz_id')
  },

  questions() {
    return this.hasMany(Question, 'quiz_id').query(qb => {
      qb.orderBy('delta', 'asc')
    })
  },

  training() {
    return this.belongsTo(Training, 'quiz_id')
  }

})

export default Quiz
