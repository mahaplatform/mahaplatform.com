const LinkWorkflowEmails = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex('crm_emails').where('id', 12).update({ workflow_id: 2 })
    await knex('crm_emails').where('id', 13).update({ workflow_id: 14 })
    await knex('crm_emails').where('id', 20).update({ workflow_id: 16 })
    await knex('crm_emails').where('id', 21).update({ workflow_id: 16 })
    await knex('crm_emails').where('id', 22).update({ workflow_id: 17 })
    await knex('crm_emails').where('id', 23).update({ workflow_id: 17 })
    await knex('crm_emails').where('id', 24).update({ workflow_id: 18 })
    await knex('crm_emails').where('id', 25).update({ workflow_id: 18 })

  },

  down: async (knex) => {
  }

}

export default LinkWorkflowEmails
