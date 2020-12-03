const CreateDomain = {

  up: async (knex) => {
    await knex.schema.dropTable('maha_domains')
    await knex.schema.createTable('maha_domains', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('name')
      table.integer('duration')
      table.boolean('auto_renew')
      table.boolean('manage_dns')
      table.enum('type', ['full','dns','hosting'], { useNative: true, enumName: 'maha_domain_types' })
      table.enum('registration_status', ['transferring','registered','expired'], { useNative: true, enumName: 'maha_domain_registration_statuses' })
      table.enum('dns_status', ['pending','resolved','unmapped'], { useNative: true, enumName: 'maha_domain_dns_statuses' })
      table.enum('hosting_status', ['pending','resolved','unmapped'], { useNative: true, enumName: 'maha_domain_hosting_statuses' })
      table.jsonb('admin_contact')
      table.jsonb('registrant_contact')
      table.jsonb('tech_contact')
      table.jsonb('zone')
      table.date('expires_on')
      table.timestamps()
    })
    const models = ['maha_teams','crm_programs','crm_forms','events_events','stores_stores']
    await Promise.mapSeries(models, async (model) => {
      await knex.schema.table(model, (table) => {
        table.integer('domain_id').unsigned()
        table.foreign('domain_id').references('maha_domains.id')
      })
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_domains')
  }

}

export default CreateDomain
