import Model from '../../../core/objects/model'
import Source from './source'
import Asset from './asset'
import User from './user'

const Profile = new Model({

  tableName: 'maha_profiles',

  rules: {},

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  source() {
    return this.belongsTo(Source, 'source_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Profile
