import DashboardPageAccess from './dashboard_page_access'
import Model from '../../../core/objects/model'
import User from './user'

const DashboardPanel = new Model({

  tableName: 'maha_dashboard_panels',

  rules: {},

  virtuals: {},

  accesses() {
    return this.hasMany(DashboardPageAccess, 'filter_id')
  },

  owner() {
    return this.belongsTo(User, 'owner_id')
  }

})

export default DashboardPanel
