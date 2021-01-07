import Site from './site'
import Model from '@core/objects/model'
import User from '@apps/maha/models/user'

const Manager = new Model({

  databaseName: 'maha',

  tableName: 'sites_managers',

  rules: {},

  virtuals: {},

  user: function() {
    return this.belongsTo(User, 'user_id')
  },

  site: function() {
    return this.belongsTo(Site, 'site_id')
  }

})

export default Manager
