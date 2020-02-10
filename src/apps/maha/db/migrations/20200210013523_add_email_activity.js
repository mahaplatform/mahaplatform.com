const AddEmailActivity = {

  up: async (knex) => {
    await knex.raw('ALTER TYPE maha_email_activities_type ADD VALUE \'webview\'')
  },

  down: async (knex) => {
  }

}

export default AddEmailActivity
