const UpdatePolymorphicKeys = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.alterTable('maha_activities', (table) => {
      table.integer('object_id').alter()
    })

    await knex.schema.alterTable('maha_audits', (table) => {
      table.integer('auditable_id').alter()
    })

    await knex.schema.alterTable('maha_comments', (table) => {
      table.integer('commentable_id').alter()
    })

    await knex.schema.alterTable('maha_listenings', (table) => {
      table.integer('listenable_id').alter()
    })

    await knex.schema.alterTable('maha_notifications', (table) => {
      table.integer('object_id').alter()
    })

    await knex.schema.alterTable('maha_reviews', (table) => {
      table.integer('reviewable_id').alter()
    })

  },

  down: async (knex) => {
  }

}

export default UpdatePolymorphicKeys
