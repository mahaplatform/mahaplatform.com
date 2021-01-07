const CreateLinks = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('maha_attachments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('maha_posts.id')
      table.integer('comment_id').unsigned()
      table.foreign('comment_id').references('maha_comments.id')
      table.integer('review_id').unsigned()
      table.foreign('review_id').references('maha_reviews.id')
      table.integer('delta')
      table.string('type')
      table.integer('image_bytes')
      table.integer('image_width')
      table.integer('image_height')
      table.string('image_url')
      table.integer('thumb_width')
      table.integer('thumb_height')
      table.string('thumb_url')
      table.string('video_url')
      table.string('video_height')
      table.string('video_width')
      table.string('service_name')
      table.string('service_icon')
      table.string('service_url')
      table.string('text')
      table.string('title')
      table.string('title_link')
      table.string('author_link')
      table.string('author_name')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_attachments')
  }

}

export default CreateLinks
