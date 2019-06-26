const DropListenings = {

  up: async (knex) => {

    await knex.schema.dropTable('maha_listenings')

    return await knex.schema.dropTable('maha_reviews')

  },

  down: async (knex) => {
  }

}

export default DropListenings
