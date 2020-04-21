const LowercaseEmails = {

  up: async (knex) => {
    await knex.raw('update crm_email_addresses set address = lower(address)')
  },

  down: async (knex) => {
  }

}

export default LowercaseEmails
