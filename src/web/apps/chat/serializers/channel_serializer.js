const ChannelSerializer = (req, trx, result) => ({

  id: result.get('id'),

  code: result.get('code'),

  name: result.get('name'),

  description: result.get('description'),

  owner: user(result.related('owner')),

  label: label(req.user.get('id'), result.related('subscriptions').toArray()),

  subscriptions: result.related('subscriptions').map(subscription),

  last_message: last_message(result.related('last_message')),

  last_message_at: result.get('last_message_at'),

  last_viewed_at: last_viewed_at(req.user.get('id'), result.related('subscriptions')),

  is_archived: result.get('is_archived'),

  is_starred: result.related('stars').reduce((is_starred, star) => {
    return is_starred || star.get('user_id') === req.user.get('id')
  }, false),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

})

const last_message = (message) => {

  if(!message.id) return null

  return {

    id: message.get('id'),

    text: message.get('text'),

    attachments_count: message.related('attachments').length,

    created_at: message.get('created_at'),

    updated_at: message.get('updated_at')

  }

}

const label = (user_id, subscriptions) => {

  if(subscriptions.length === 1) return 'You'

  return subscriptions.filter(subscription => {
    return subscription.get('user_id') !== user_id
  }).reduce((list, subscription) => {
    if(list.length === 3) {
      return [
        ...list.slice(0,2),
        list[2] + 1
      ]
    } else if(list.length === 2) {
      return [
        ...list.slice(0,2),
        1
      ]
    } else {
      return [
        ...list,
        subscription.related('user')
      ]
    }
  }, []).reduce((text, item, index, list) => {
    if(list.length === 1) {
      return item.get('full_name')
    } else if(index + 1 === list.length) {
      if(index === 2) return `${text}, and ${item} others`
      if(index === 1) return `${text} and ${item.get('first_name')}`
      return item
    } else {
      return index > 0 ? `${text}, ${item.get('first_name')}` : item.get('first_name')
    }
  }, '')
}

const subscription = (subscription) => ({

  id: subscription.related('user').get('id'),

  full_name: subscription.related('user').get('full_name'),

  initials: subscription.related('user').get('initials'),

  photo: subscription.related('user').related('photo') ? subscription.related('user').related('photo').get('path') : null,

  last_message: {

    id: subscription.get('last_message_id'),

    viewed_at: subscription.get('last_viewed_at')

  },

  last_online_at: subscription.related('user').get('last_online_at')

})

const user = (user) => ({

  id: user.get('id'),

  full_name: user.get('full_name'),

  initials: user.get('initials'),

  photo: user.related('photo') ? user.related('photo').get('path') : null,

  last_online_at: user.get('last_online_at')

})

const last_viewed_at = (user_id, subscriptions) => subscriptions.reduce((last_viewed_at, subscription) => {

  return last_viewed_at || subscription.related('user').get('id') === user_id ? subscription.get('last_viewed_at') : null

}, null)

export default ChannelSerializer
