const UpdateSenders = {

  databaseName: 'maha',

  up: async (knex) => {
    const teams = await knex('maha_teams')
    await Promise.map(teams, async (team) => {
      const senders = await knex('crm_senders').where('team_id', team.id)
      await Promise.map(senders, async (sender) => {
        const replacement = `${sender.email.replace(/@.*/g,'').toLowerCase()}-${team.subdomain}@mahaplatform.com`
        await knex('crm_senders').where('id', sender.id).update({
          email: replacement
        })
      })
    })
  },

  down: async (knex) => {
  }

}

export default UpdateSenders
