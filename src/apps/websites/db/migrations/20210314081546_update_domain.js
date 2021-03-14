const UpdateDomain = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('websites_domains', (table) => {
      table.boolean('auto_renew')
      table.boolean('auth_code')
      table.integer('duration')
      table.jsonb('admin_contact')
      table.jsonb('registrant_contact')
      table.jsonb('tech_contact')
      table.string('aws_registration_id')
      table.string('aws_transfer_id')
      table.enum('type', ['registration','transfer','dns'], { useNative: true, enumName: 'websites_domain_types' })
      table.enum('registration_status', ['pending','inprogress','success','failed'], { useNative: true, enumName: 'websites_domain_registration_statuses' })
      table.enum('transfer_status', ['pending','inprogress','success','failed'], { useNative: true, enumName: 'websites_domain_transfer_statuses' })
      table.enum('dns_status', ['pending','success'], { useNative: true, enumName: 'websites_dns_statuses' })
      table.enum('status', ['registering','transfering','mapping','active','expired'], { useNative: true, enumName: 'websites_domain_statuses' })
      table.timestamp('expires_on')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateDomain
