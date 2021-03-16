const CreateCertificate = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('websites_certificates', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('website_id').unsigned()
      table.foreign('website_id').references('maha_teams.id')
      table.string('aws_certificate_arn')
      table.timestamps()
    })

    await knex.schema.createTable('websites_certificates_domains', (table) => {
      table.integer('certificate_id').unsigned()
      table.foreign('certificate_id').references('websites_certificates.id')
      table.integer('domain_id').unsigned()
      table.foreign('domain_id').references('websites_domains.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('websites_certificates')
    await knex.schema.dropTable('websites_certificates_domains')
  }

}

export default CreateCertificate
