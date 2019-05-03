import Migration from '../../../../core/objects/migration'

const CreateAlerts = new Migration({

  up: async (knex) => {

    await knex('maha_notification_types').update({
      app_id: null
    }).where({
      app_id: 1
    })

    await knex.schema.table('maha_apps', (table) => {
      table.string('code')
    })

    const apps = await knex('maha_apps')

    await Promise.map(apps, async (app) => {
      await knex('maha_apps').where({
        id: app.id
      }).update({
        code: app.title.toLowerCase().replace(' ', '')
      })
    })

    await knex.schema.table('maha_apps', (table) => {
      table.dropColumn('app_category_id')
      table.dropColumn('app_author_id')
      table.dropColumn('title')
      table.dropColumn('description')
      table.dropColumn('version')
      table.dropColumn('color')
      table.dropColumn('icon')
      table.dropColumn('created_at')
      table.dropColumn('updated_at')
    })

    await knex.schema.dropTable('maha_app_authors')

    await knex.schema.dropTable('maha_app_categories')

    await knex.schema.createTable('maha_alerts', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
      table.string('code')
    })

    await knex.schema.createTable('maha_users_alerts', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('alert_id').unsigned()
      table.foreign('alert_id').references('maha_alerts.id')
    })

    await knex.schema.table('maha_notification_types', (table) => {
      table.string('code')
    })

    const types = await knex('maha_notification_types')

    await Promise.map(types, async (type) => {
      await knex('maha_notification_types').where({
        id: type.id
      }).update({
        code: type.text
      })
    })

    await knex.schema.table('maha_notification_types', (table) => {
      table.dropColumn('text')
      table.dropColumn('description')
    })

    await knex.schema.table('maha_rights', (table) => {
      table.string('code')
    })

    const rights = await knex('maha_rights')

    await Promise.map(rights, async (right) => {
      await knex('maha_rights').where({
        id: right.id
      }).update({
        code: right.text.toLowerCase().replace(' ', '_')
      })
    })

    await knex.schema.table('maha_rights', (table) => {
      table.dropColumn('text')
      table.dropColumn('description')
      table.dropColumn('created_at')
      table.dropColumn('updated_at')
    })
  },

  down: async (knex) => {

    await knex.schema.dropTable('maha_alerts')

    await knex.schema.dropTable('maha_users_alerts')

  }

})

export default CreateAlerts
