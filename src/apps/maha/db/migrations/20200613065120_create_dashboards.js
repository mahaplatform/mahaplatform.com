import { bootstrapType } from '@core/scripts/bootstrap/bootstrap'
import DashboardPanel from '../../models/dashboard_panel'
import DashboardCard from '../../models/dashboard_card'
import User from '../../../maha/models/user'

const CreateDashboardCard = {

  up: async (knex) => {

    await bootstrapType('dashboard', 'dashboard/index', 'maha_dashboard_card_types')

    const users = await User.fetchAll({
      transacting: knex
    })

    await Promise.mapSeries(users, async (user) => {

      const panel = await DashboardPanel.forge({
        team_id: user.get('team_id'),
        owner_id: user.get('id'),
        title: 'My Dashboard'
      }).save(null, {
        transacting: knex
      })

      await DashboardCard.forge({
        team_id: user.get('team_id'),
        panel_id: panel.get('id'),
        type_id: 2,
        config: {}
      }).save(null, {
        transacting: knex
      })

    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_dashboard_cards')
  }

}

export default CreateDashboardCard
