const UpdateDomain = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('websites_domains', (table) => {
      table.boolean('is_system')
      table.string('aws_zone_id')
      table.jsonb('config')
    })

    await knex.schema.table('websites_websites', (table) => {
      table.string('aws_cloudfront_id')
      table.string('aws_cloudfront_subdomain')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateDomain
