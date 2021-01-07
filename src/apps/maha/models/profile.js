import Model from '@core/objects/model'
import Account from './account'
import Asset from './asset'

const Profile = new Model({

  databaseName: 'maha',

  belongsToTeam: false,

  tableName: 'maha_profiles',

  rules: {},

  account() {
    return this.belongsTo(Account, 'account_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  }

})

export default Profile
