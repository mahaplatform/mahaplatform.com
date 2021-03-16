const CreateRecord = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('alter type websites_dns_statuses add value \'inprogress\'')

    await knex.schema.createTable('websites_records', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('domain_id').unsigned()
      table.foreign('domain_id').references('websites_domains.id')
      table.boolean('is_system')
      table.string('name')
      table.enum('type', ['A','CNAME','MX','NS','SOA','TXT'], { useNative: true, enumName: 'websites_record_types' })
      table.integer('ttl')
      table.jsonb('alias')
      table.specificType('records', 'jsonb[]')
      table.timestamps()
    })

    await knex.schema.table('websites_domains', (table) => {
      table.dropColumn('aws_registration_id')
      table.dropColumn('aws_transfer_id')
      table.dropColumn('is_system')
      table.dropColumn('duration')
      table.dropColumn('config')
      table.string('aws_operation_id')
      table.enum('registrant_status', ['pending','success','failed'], { useNative: true, enumName: 'websites_domain_registrant_statuses' })
    })

    await knex('websites_domains').whereIn('id', [1,2]).delete()

    await knex.schema.table('websites_websites', (table) => {
      table.string('slug')
    })

    await knex('websites_websites').where('id', 1).update({
      slug: 'cce-tompkins-ccetompkins'
    })

    await knex('websites_websites').where('id', 2).update({
      slug: 'cce-tompkins-2-ccetompkins'
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('websites_records')
  }

}

export default CreateRecord
