const UpdateEnrollments = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex('crm_workflows').whereNull('is_unique').update({
      is_unique: false
    })
    
  },

  down: async (knex) => {
  }

}

export default UpdateEnrollments
