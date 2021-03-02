import DashboardPanelAccess from './dashboard_panel_access'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import DashboardCard from './dashboard_card'
import User from './user'

const DashboardPanel = new Model(knex, {

  databaseName: 'maha',

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
