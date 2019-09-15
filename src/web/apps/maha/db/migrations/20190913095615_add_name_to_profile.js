const AddNameToProfile = {

  up: async (knex) => {
    await knex.schema.table('maha_profiles', (table) => {
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
      table.string('profile_id')
      table.string('username')
      table.string('scope')
    })
  },

  down: async (knex) => {
  }

}

export default AddNameToProfile
