import Migration from '../../../../core/objects/migration'

const sounds = ['ding','boing','drop','tada','plink','wow','here_you_go','hi','knock_brush','whoah','yoink']

const AddPreferences = new Migration({

  up: async (knex) => {

    const methods = ['none','ondemand', 'digest']

    await knex.schema.table('maha_users', (table) => {
      table.enum('email_notifications_method', methods)
    })

    await Promise.map(methods, async (method, index) => {

      await knex('maha_users').where({
        notification_method_id: index + 1
      }).update({
        email_notifications_method: method
      })

    })

    await knex.schema.table('maha_users', (table) => {
      table.dropColumn('notification_method_id')
      table.boolean('notifications_enabled').defaultTo(false),
      table.boolean('in_app_notifications_enabled').defaultTo(false),
      table.boolean('notification_sound_enabled').defaultTo(false),
      table.enum('notification_sound', sounds)
      table.boolean('push_notifications_enabled').defaultTo(false),
      table.boolean('mute_evenings').defaultTo(false),
      table.time('mute_evenings_end_time')
      table.time('mute_evenings_start_time')
      table.boolean('mute_weekends').defaultTo(false)
    })

    await knex.schema.table('maha_sessions', (table) => {
      table.string('code')
    })

    await knex.schema.dropTable('maha_notification_methods')

    await knex('maha_users').update({
      notifications_enabled: true,
      in_app_notifications_enabled: true,
      notification_sound_enabled: true,
      notification_sound: 'ding',
      push_notifications_enabled: true,
      mute_evenings: true,
      mute_evenings_start_time: '18:00',
      mute_evenings_end_time: '9:00',
      mute_weekends: true
    })

    const records = await knex('maha_users_notification_types')

    await knex.schema.dropTable('maha_users_notification_types')

    await knex.schema.createTable('maha_users_notification_types', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('notification_type_id').unsigned()
      table.foreign('notification_type_id').references('maha_notification_types.id')
      table.boolean('inapp_enabled')
      table.boolean('push_enabled')
      table.boolean('email_enabled')
    })

    await knex('maha_users_notification_types').insert(records.map(record =>({
      ...record,
      inapp_enabled: false,
      push_enabled: false,
      email_enabled: false
    })))

  },

  down: async (knex) => {}

})

export default AddPreferences
