import Model from '../../../core/objects/model'
import Question from './question'

const Answer = new Model({

  tableName: 'learning_answers',

  rules: {},

  virtuals: {},

  question() {
    return this.belongsTo(Question, 'question_id')
  }

})

export default Answer
