const AddExtraReminders = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('competencies_plans', table => {
      table.dropColumn('remind_me_week')
      table.dropColumn('remind_me_day')
      table.boolean('remind_me_4_weeks').defaultTo(false)
      table.boolean('remind_me_2_weeks').defaultTo(false)
      table.boolean('remind_me_1_week').defaultTo(false)
    })

  },

  down: async (knex) => {
  }

}

export default AddExtraReminders
