import Migration from '../../../../core/objects/migration'

const CreatePostsPhotos = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_posts_photos', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('maha_posts.id')
      table.integer('delta')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_posts_photos')
  }

})

export default CreatePostsPhotos
