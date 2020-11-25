const MigrateTypes = {

  up: async (knex) => {

    await knex.raw('alter type crm_profile_sources rename to maha_profile_sources')

    await knex.raw('alter type maha_profile_sources add value \'adobesign\'')

  },

  down: async (knex) => {
  }

}

export default MigrateTypes
