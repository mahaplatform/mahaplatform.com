const PlatformVideos = {

  up: async (knex) => {
    await knex.schema.table('maha_help_articles', (table) => {
      table.dropColumn('video_id')
      table.integer('desktop_id').unsigned()
      table.foreign('desktop_id').references('maha_assets.id')
      table.integer('mobile_id').unsigned()
      table.foreign('mobile_id').references('maha_assets.id')
    })
  },

  down: async (knex) => {
  }

}

export default PlatformVideos
