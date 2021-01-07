import Model from '@core/objects/model'
import User from './user'

const Star = new Model({

  databaseName: 'maha',

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
