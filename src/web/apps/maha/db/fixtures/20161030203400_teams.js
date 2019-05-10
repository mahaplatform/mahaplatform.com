const moment = require('moment')

const teams = async (knex, Promise) => {

  await knex('assets').del()

  await knex('assets').insert([
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
