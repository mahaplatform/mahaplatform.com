const MigrateEmails = {

  up: async (knex) => {

    const emails = await knex('crm_emails')

    await Promise.map(emails, async (email) => {
      const config = email.config

      await knex('crm_emails').update({
        config: {
          page: config.page,
          header: {
            blocks: []
          },
          body: {
            background_color: '#FFFFFF',
            blocks: config.blocks
          },
          footer: {
            blocks: []
          },
          settings: config.settings
        }
      }).where('id', email.id)
    })

  },

  down: async (knex) => {
  }

}

export default MigrateEmails
