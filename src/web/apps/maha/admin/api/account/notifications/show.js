const showRoute = async (req, res) => {

  const user_notificaton_types = await req.trx('maha_users_notification_types')
    .where('user_id', req.user.get('id'))

  res.status(200).respond({
    notifications_enabled: req.user.get('notifications_enabled'),
    in_app_notifications_enabled: req.user.get('in_app_notifications_enabled'),
    sounds: {
      notification_sound_enabled: req.user.get('notification_sound_enabled'),
      notification_sound: req.user.get('notification_sound')
    },
    push_notifications_enabled: req.user.get('push_notifications_enabled'),
    email_notifications_method: req.user.get('email_notifications_method'),
    mute: {
      mute_evenings: req.user.get('mute_evenings'),
      mute_evenings_end_time: req.user.get('mute_evenings_end_time'),
      mute_evenings_start_time: req.user.get('mute_evenings_start_time'),
      mute_weekends: req.user.get('mute_weekends')
    },
    ignored: user_notificaton_types
  })

}

export default showRoute
