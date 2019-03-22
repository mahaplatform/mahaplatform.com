import MessageSerializer from '../../../serializers/message_serializer'
import Message from '../../../models/message'
import { ListRoute } from 'maha'

const defaultQuery = (req, trx, qb, options) => {

  qb.joinRaw('inner join "maha_stars" on "maha_stars"."starrable_type"=\'chat_messages\' and "maha_stars"."starrable_id"="chat_messages"."id"')

  qb.where('maha_stars.user_id', req.user.get('id'))

}

const StarredRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['-created_at'],
  model: Message,
  method: 'get',
  path: '/starred',
  serializer: MessageSerializer,
  withRelated: ['attachments.asset.source','attachments.service','message_type','user.photo','reactions.user.photo','stars']
})

export default StarredRoute
