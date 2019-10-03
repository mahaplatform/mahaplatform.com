import Model from '../../../web/core/objects/model'
import User from './user'

const Star = new Model({

  tableName: 'maha_stars',

  rules: {

  },

  virtuals: {

  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Star
