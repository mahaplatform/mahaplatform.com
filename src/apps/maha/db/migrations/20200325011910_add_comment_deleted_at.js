const AddCommentDeletedAt = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_comments', (table) => {
      table.timestamp('deleted_at')
    })

  },

  down: async (knex) => {
  }

}

export default AddCommentDeletedAt
