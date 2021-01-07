const RemovePlans = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex('competencies_commitments').delete()

    await knex('competencies_goals').delete()

    await knex('competencies_plans').delete()

    await knex.schema.table('competencies_plans', table => {
      table.boolean('remind_me_week').defaultTo(false)
      table.boolean('remind_me_day').defaultTo(false)
    })

  },

  down: async (knex) => {
  }

}

export default RemovePlans
