const AddLockToken = {

  up: async (knex) => {

    await knex.schema.table('drive_folders', (table) => {
      table.string('lock_token')
    })

    await knex.schema.table('drive_files', (table) => {
      table.string('lock_token')
    })

  },

  down: async (knex) => {
  }

}

export default AddLockToken
