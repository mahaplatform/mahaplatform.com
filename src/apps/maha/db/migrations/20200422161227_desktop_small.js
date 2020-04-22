const DesktopSmall = {

  up: async (knex) => {
    await knex.schema.table('maha_help_articles', (table) => {
      table.integer('desktop_small_id').unsigned()
      table.foreign('desktop_small_id').references('maha_assets.id')
    })
  },

  down: async (knex) => {
  }

}

export default DesktopSmall
