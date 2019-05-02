import Migration from '../../core/objects/migration'

const AddSecondaryEmail = new Migration({

  up: async (knex) => {

    await knex.schema.table('maha_users', (table) => {
      table.string('secondary_email')
    })

  },

  down: async (knex) => {}

})

export default AddSecondaryEmail
