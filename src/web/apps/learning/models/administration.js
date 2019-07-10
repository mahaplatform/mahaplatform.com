import User from '../../maha/models/user'
import Model from '../../../core/objects/model'
import Answering from './answering'
import Quiz from './quiz'

const Administration = new Model({

  tableName: 'learning_administrations',

  rules: {},

  virtuals: {

    answerings_count() {
      return this.related('answerings').length
    },

    is_complete() {
      return this.get('answerings_count') === this.get('total_count')
    },

    score() {
      return Math.ceil((this.get('correct_count') / this.get('total_count')) * 100)
    }

  },

  answerings() {
    return this.hasMany(Answering, 'administration_id')
  },

  quiz() {
    return this.belongsTo(Quiz, 'quiz_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Administration
