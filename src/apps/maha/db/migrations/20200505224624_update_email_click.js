const UpdateEmailClick = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex('maha_emails').whereNull('was_clicked').update({
      was_clicked: false
    })
  },

  down: async (knex) => {
  }

}

export default UpdateEmailClick
