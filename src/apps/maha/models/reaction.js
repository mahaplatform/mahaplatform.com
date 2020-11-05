import Model from '@core/objects/model'
import User from './user'

const Reaction = new Model({

  tableName: 'maha_reactions',

  rules: {

  },

  virtuals: {

  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Reaction
