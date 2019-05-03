import Model from '../../../core/objects/model'
import User from './user'

const Listening = new Model({

  tableName: 'maha_listenings',

  rules: {
    listenable_type: 'required',
    listenable_id: 'required',
    user_id: 'required'
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Listening
