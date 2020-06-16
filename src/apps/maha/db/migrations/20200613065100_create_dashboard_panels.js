import DashboardPanel from '../../models/dashboard_panel'
import User from '../../../maha/models/user'

const CreateDashboardPanel = {

  up: async (knex) => {
    await knex.schema.createTable('maha_dashboard_panels', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('maha_users.id')
      table.string('title')
      table.timestamps()
    })

    const users = await User.fetchAll({
      transacting: knex
    })

    await Promise.mapSeries(users, async (user) => {
      await DashboardPanel.forge({
        team_id: user.get('team_id'),
        owner_id: user.get('id'),
        title: 'My Dashboard'
      }).save(null, {
        transacting: knex
      })
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_dashboard_panels')
  }

}

export default CreateDashboardPanel
