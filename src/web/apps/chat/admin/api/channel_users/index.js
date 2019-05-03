import User from '../../../../maha/models/user'
import { Resources } from '../../../../../core/backframe'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('chat_subscriptions', 'chat_subscriptions.user_id', 'maha_users.id')

  qb.where('chat_subscriptions.channel_id', req.params.channel_id)

}

const serializer = (req, trx, result) => ({

  id: result.get('id'),

  full_name: result.get('full_name'),

  initials: result.get('initials'),

  photo: result.related('photo') ? result.related('photo').get('path') : null,

  last_online_at: result.get('last_online_at')

})

const userResources = new Resources({
  defaultQuery,
  model: User,
  path: '/channels/:channel_id/users',
  serializer,
  withRelated: ['photo']
})

export default userResources
