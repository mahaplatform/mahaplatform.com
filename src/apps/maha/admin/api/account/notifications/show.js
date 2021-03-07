const showRoute = async (req, res) => {

  const user_notificaton_types = await req.trx('maha_users_notification_types')
    .where('user_id', req.user.get('id'))

  const preferences = req.account.get('preferences')

  res.status(200).respond({
    notifications_enabled: preferences.notifications_enabled,
    in_app_notifications_enabled: preferences.in_app_notifications_enabled,
    sounds: {
      notification_sound_enabled: preferences.notification_sound_enabled,
      notification_sound: preferences.notification_sound
    },
    push_notifications_enabled: preferences.push_notifications_enabled,
    email_notifications_method: preferences.email_notifications_method,
    mute: {
      mute_evenings: preferences.mute_evenings,
      mute_evenings_end_time: preferences.mute_evenings_end_time,
      mute_evenings_start_time: preferences.mute_evenings_start_time,
      mute_weekends: preferences.mute_weekends
    },
    ignored: user_notificaton_types
  })

}

export default showRoute
