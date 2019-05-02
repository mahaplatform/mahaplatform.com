import { Migration } from 'maha'

const AddCaptions = new Migration({

  up: async (knex) => {

    await knex.schema.table('maha_attachments', (table) => {
      table.string('caption')
    })

  },

  down: async (knex) => {

    await knex.schema.table('maha_attachments', (table) => {
      table.dropColumn('caption')
    })

  }

})

export default AddCaptions
