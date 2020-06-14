import DashboardCardType from './dashboard_card_type'
import Model from '../../../core/objects/model'
import DashboardPanel from './dashboard_panel'

const DashboardCard = new Model({

  tableName: 'maha_dashboard_cards',

  rules: {},

  virtuals: {},

  panel() {
    return this.belongsTo(DashboardPanel, 'panel_id')
  },

  type() {
    return this.belongsTo(DashboardCardType, 'type_id')
  }

})

export default DashboardCard
