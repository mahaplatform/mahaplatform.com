const CreateCertificateDomain = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('websites_certificate_domains', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('certificate_id').unsigned()
      table.foreign('certificate_id').references('websites_certificates.id')
      table.integer('domain_id').unsigned()
      table.foreign('domain_id').references('websites_domains.id')
      table.enum('status', ['pending','success','failed'], { useNative: true, enumName: 'websites_certiicate_domain_statuses' })
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('websites_certificate_domains')
  }

}

export default CreateCertificateDomain
