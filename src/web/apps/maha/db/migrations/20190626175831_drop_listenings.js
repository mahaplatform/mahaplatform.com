const DropListenings = {

  up: async (knex) => {
    return await knex.schema.dropTable('maha_listenings')
  },

  down: async (knex) => {
  }

}

export default DropListenings
