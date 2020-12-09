import moment from 'moment'

const CreateAdmin = {

  up: async (knex) => {

    await knex.schema.table('maha_roles', (table) => {
      table.enum('type', ['admin','custom'], { useNative: true, enumName: 'maha_role_types' })
    })

    await knex('maha_roles').whereRaw('lower(title) like ?', '%admin%').update({
      type: 'admin'
    })

    await knex('maha_roles').whereNull('type').update({
      type: 'custom'
    })

    const teams = await knex('maha_teams').select('maha_teams.*').joinRaw('left join maha_roles on maha_roles.team_id=maha_teams.id and lower(maha_roles.title) like ?', '%employee%').whereNull('maha_roles.id')

    await Promise.mapSeries(teams, async (team) => {
      await knex('maha_roles').insert({
        team_id: team.id,
        title: 'Employees',
        type: 'custom',
        created_at: moment(),
        updated_at: moment()
      })
    })

  },

  down: async (knex) => {
  }

}

export default CreateAdmin
