import Model from '../../../core/objects/model'
import Answer from './answer'
import Quiz from './quiz'

const Question = new Model({

  tableName: 'learning_questions',

  rules: {},

  virtuals: {},

  answers() {
    return this.hasMany(Answer, 'question_id')
  },

  quiz() {
    return this.belongsTo(Quiz, 'quiz_id')
  }

})

export default Question
