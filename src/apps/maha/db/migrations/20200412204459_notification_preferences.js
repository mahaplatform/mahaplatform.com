const NotificationPreferences = {

  up: async (knex) => {
    await knex('maha_users').update({
      mute_evenings: false,
      mute_weekends: false
    })
  },

  down: async (knex) => {
  }

}

export default NotificationPreferences
