const MakeAttachmentsPolymorphic = {

  up: async (knex) => {

    await knex.schema.createTable('maha_services', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('icon')
      table.string('url')
    })

    await knex.schema.table('maha_attachments', (table) => {
      table.text('from_url')
      table.string('attachable_type')
      table.integer('attachable_id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.integer('service_id').unsigned()
      table.foreign('service_id').references('maha_services.id')
    })

    await knex.schema.table('maha_attachments', (table) => {
      table.dropColumn('comment_id')
      table.dropColumn('review_id')
      table.dropColumn('post_id')
      table.dropColumn('service_name')
      table.dropColumn('service_icon')
      table.dropColumn('service_url')
    })

  },

  down: async (knex) => {

    await knex.schema.table('maha_attachments', (table) => {
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('maha_posts.id')
      table.integer('comment_id').unsigned()
      table.foreign('comment_id').references('maha_comments.id')
      table.integer('review_id').unsigned()
      table.foreign('review_id').references('maha_reviews.id')
    })

    await knex.schema.table('maha_attachments', (table) => {
      table.string('from_url')
      table.dropColumn('attachable_type')
      table.dropColumn('attachable_id')
      table.dropColumn('asset_id')
    })

  }

}

export default MakeAttachmentsPolymorphic
