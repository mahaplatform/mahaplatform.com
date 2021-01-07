const UpdateDomains = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('maha_domains', (table) => {
      table.dropColumn('expires_on')
      table.string('aws_zone_id')
      table.string('aws_certificate_arn')
      table.timestamp('domain_expires_on')
      table.timestamp('certificate_expires_on')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateDomains
