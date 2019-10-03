const AddDescriptionToGoals = {

  up: async (knex) => {

    await knex.schema.table('competencies_goals', table => {
      table.text('description')
    })

  },

  down: async (knex) => {
  }

}

export default AddDescriptionToGoals
