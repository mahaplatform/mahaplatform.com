import DashboardPanelAccess from './dashboard_panel_access'
import Model from '@core/objects/model'
import DashboardCard from './dashboard_card'
import User from './user'

const DashboardPanel = new Model({

  tableName: 'maha_dashboard_panels',

  rules: {},

  virtuals: {},

  accesses() {
    return this.hasMany(DashboardPanelAccess, 'panel_id')
  },

  cards() {
    return this.hasMany(DashboardCard, 'panel_id')
  },

  owner() {
    return this.belongsTo(User, 'owner_id')
  }

})

export default DashboardPanel
