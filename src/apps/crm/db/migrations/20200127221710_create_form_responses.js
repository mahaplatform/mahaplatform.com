const CreateFormResponses = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create view crm_form_responses as
      select
      crm_forms.id as form_id,
      count(crm_responses.*) as num_responses
      from crm_forms
      left join crm_responses on crm_responses.form_id=crm_forms.id
      group by crm_forms.id
    `)

  },

  down: async (knex) => {
  }

}

export default CreateFormResponses
