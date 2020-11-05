import Model from '@core/objects/model'
import Account from './account'
import Source from './source'
import Asset from './asset'

const Profile = new Model({

  belongsToTeam: false,

  tableName: 'maha_profiles',

  rules: {},

  account() {
    return this.belongsTo(Account, 'account_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  source() {
    return this.belongsTo(Source, 'source_id')
  }

})

export default Profile
