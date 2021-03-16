const CreateRecord = {

  databaseName: 'maha',

  up: async (knex) => {

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
      table.integer('alias')
      table.jsonb('value')
      table.timestamps()
    })

    await knex.schema.table('websites_domains', (table) => {
      table.dropColumn('config')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('websites_records')
  }

}

export default CreateRecord
