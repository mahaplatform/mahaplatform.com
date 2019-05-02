import Site from './site'
import { Model, User } from 'maha'

const Manager = new Model({

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
