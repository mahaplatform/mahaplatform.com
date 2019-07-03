import Administration from './administration'
import Question from './question'
import Model from '../../../core/objects/model'
import Answer from './answer'

const Answering = new Model({

  tableName: 'learning_answerings',

  rules: {},

  virtuals: {},

  administration() {
    return this.belongsTo(Administration, 'administration_id')
  },

  answer() {
    return this.belongsTo(Answer, 'answer_id')
  },

  question() {
    return this.belongsTo(Question, 'question_id')
  }

})

export default Answering
