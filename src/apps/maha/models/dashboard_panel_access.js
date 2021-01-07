import Model from '@core/objects/model'
import DashboardPanel from './dashboard_panel'
import Grouping from './grouping'
import Group from './group'
import User from './user'

const DashboardPanelAccess = new Model({

  databaseName: 'maha',

  tableName: 'maha_dashboard_panel_accesses',

  rules: {},

  virtuals: {},

  panel() {
    return this.belongsTo(DashboardPanel, 'panel_id')
  },

  grouping() {
    return this.belongsTo(Grouping, 'grouping_id')
  },

  group() {
    return this.belongsTo(Group, 'group_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default DashboardPanelAccess
