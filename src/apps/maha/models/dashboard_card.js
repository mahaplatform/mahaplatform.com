import Model from '../../../core/objects/model'
import DashboardPanel from './dashboard_panel'

const DashboardCard = new Model({

  tableName: 'maha_dashboard_cards',

  rules: {},

  virtuals: {},

  panel() {
    return this.belongsTo(DashboardPanel, 'panel_id')
  }

})

export default DashboardCard
