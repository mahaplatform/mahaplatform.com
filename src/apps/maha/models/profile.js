import Model from '../core/objects/model'
import Source from './source'
import User from './user'

const Profile = new Model({

  tableName: 'maha_profiles',

  rules: {
  },

  user() {
    return this.belongsTo(User, 'user_id')
  },

  source() {
    return this.belongsTo(Source, 'source_id')
  }

})

export default Profile
