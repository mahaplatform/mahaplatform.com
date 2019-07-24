const AddInfectedToAsset = {

  up: async (knex) => {

    await knex.schema.table('maha_assets', (table) => {
      table.boolean('is_infected')
      table.specificType('viruses', 'varchar(255)[]')
    })

  },

  down: async (knex) => {
  }

}

export default AddInfectedToAsset
