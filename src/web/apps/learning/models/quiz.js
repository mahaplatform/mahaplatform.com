import Administration from './administration'
import Model from '../../../core/objects/model'
import Question from './question'

const Quiz = new Model({

  tableName: 'learning_quizzes',

  rules: {},

  virtuals: {},

  questions() {
    return this.hasMany(Question, 'quiz_id')
  },

  administrations() {
    return this.hasMany(Administration, 'quiz_id')
  }

})

export default Quiz
