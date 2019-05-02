import webpush from 'web-push'

export const sendViaPush = async (session, notification) => {

  const payload = JSON.stringify(notification)

  await webpush.sendNotification({
    endpoint: session.related('device').get('push_endpoint'),
    keys: {
      p256dh: session.related('device').get('push_p256dh'),
      auth: session.related('device').get('push_auth')
    }
  }, payload, {
    gcmAPIKey: process.env.FCM_API_KEY,
    vapidDetails: {
      subject: 'mailto:greg@thinktopography.com',
      publicKey: process.env.VAPID_PUBLIC_KEY,
      privateKey: process.env.VAPID_PRIVATE_KEY
    }
  })

}
