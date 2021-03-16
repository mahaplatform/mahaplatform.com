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
      table.enum('status', ['pending','success','failed'], { useNative: true, enumName: 'websites_certificate_statuses' })
      table.timestamps()
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('websites_certificates')
  }

}

export default CreateCertificate
