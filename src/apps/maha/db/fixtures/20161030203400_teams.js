const moment = require('moment')

const teams = async (knex) => {

  await knex('maha_teams').del()

  await knex('maha_teams').insert([
    {
      title: 'CCE Tompkins',
      subdomain: 'ccetompkins',
      logo_id: 1,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}

export default teams
