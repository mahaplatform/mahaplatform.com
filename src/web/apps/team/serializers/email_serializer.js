import serializer from '../../../core/objects/serializer'

const emailSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  user: user(result, 'user'),

  to: result.get('to'),

  subject: result.get('subject'),

  html: result.get('html'),

  status: result.get('status'),

  activities: result.related('activities').map(activity => ({

    id: activity.get('id'),

    type: activity.get('type'),

    link: activity.related('link') ? {

      id: activity.related('link').get('id'),

      text: activity.related('link').get('text'),

      url: activity.related('link').get('url')

    } : null,

    created_at: activity.get('created_at')

  })),

  was_delivered: result.get('was_delivered'),

  was_opened: result.get('was_opened'),

  sent_at: result.get('sent_at'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const user = (result, key) => {

  if(!result.related(key)) return null

  return {

    id: result.related(key).get('id'),

    full_name: result.related(key).get('full_name'),

    initials: result.related(key).get('initials'),

    photo: result.related(key).related('photo') ? result.related(key).related('photo').get('path') : null

  }

}

export default emailSerializer
