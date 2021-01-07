import moment from 'moment'

const AddContacts = {

  databaseName: 'maha',

  up: async (knex) => {

    const users = await knex('maha_users').where({ team_id: 1 })

    await Promise.mapSeries(users, async (user) => {

      const contact = await knex('crm_contacts').insert({
        team_id: 1,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        values: {},
        created_at: moment(),
        updated_at: moment()
      }).returning('*').then(results => results[0])

      await knex('crm_email_addresses').insert({
        team_id: 1,
        contact_id: contact.id,
        address: user.email,
        is_primary: true,
        created_at: moment(),
        updated_at: moment()
      })

    })
  },

  down: async (knex) => {
  }

}

export default AddContacts
