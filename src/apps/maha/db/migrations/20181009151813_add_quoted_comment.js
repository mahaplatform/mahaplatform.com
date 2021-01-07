const AddQuotedComment = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_comments', (table) => {
      table.integer('quoted_comment_id').unsigned()
      table.foreign('quoted_comment_id').references('maha_comments.id')
    })

  },

  down: async (knex) => {

    await knex.schema.table('maha_comments', (table) => {
      table.dropColumn('quoted_comment_id')
    })

  }

}

export default AddQuotedComment
