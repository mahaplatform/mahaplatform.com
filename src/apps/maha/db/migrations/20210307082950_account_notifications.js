import _ from 'lodash'

const AccountNotifications = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.alterTable('maha_accounts', function(table) {
      table.jsonb('preferences')
    })

    const accounts = await knex('maha_accounts')

    await Promise.mapSeries(accounts, async(account) => {

      const user = await knex('maha_users').where('account_id', account.id).then(r => r[0]) || {}

      const defaults = (value, def) => {
        return (_.isNil(value)) ? def : value
      }

      await knex('maha_accounts').where('id', account.id).update({
        preferences: {
          email_notifications_method: defaults(user.email_notifications_method, 'ondemand'),
          in_app_notifications_enabled: defaults(user.in_app_notifications_enabled, true),
          mute_evenings: defaults(user.mute_evenings, true),
          mute_evenings_end_time: defaults(user.mute_evenings_end_time, '9:00'),
          mute_evenings_start_time: defaults(user.mute_evenings_start_time, '18:00'),
          mute_weekends: defaults(user.mute_weekends, true),
          notification_sound: defaults(user.notification_sound, 'ding'),
          notification_sound_enabled: defaults(user.notification_sound_enabled, true),
          notifications_enabled: defaults(user.notifications_enabled, true),
          push_notifications_enabled: defaults(user.push_notifications_enabled, true)
        }
      })

    })

    await knex.schema.alterTable('maha_users', function(table) {
      table.dropColumn('email_notifications_method')
      table.dropColumn('in_app_notifications_enabled')
      table.dropColumn('mute_evenings')
      table.dropColumn('mute_evenings_end_time')
      table.dropColumn('mute_evenings_start_time')
      table.dropColumn('mute_weekends')
      table.dropColumn('notification_sound')
      table.dropColumn('notification_sound_enabled')
      table.dropColumn('notifications_enabled')
      table.dropColumn('push_notifications_enabled')
    })

    await knex('maha_notifications').update({
      is_delivered: true,
      is_visited: true,
      is_seen: true
    })

  },

  down: async (knex) => {
  }

}

export default AccountNotifications
