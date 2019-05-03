import ChannelSerializer from '../../../serializers/channel_serializer'
import MessageSerializer from '../../../serializers/message_serializer'
import Result from '../../../models/result'
import { ListRoute } from '../../../../../core/backframe'

const listRoute = new ListRoute({
  defaultSort: '-date',
  model: Result,
  method: 'get',
  ownedByUser: true,
  path: '/search',
  withRelated: ['channel.owner.photo','channel.subscriptions.user.photo','channel.last_message','message.attachments.asset.source','message.attachments.service','message.message_type','message.user.photo'],
  searchParams: ['text'],
  serializer: async (req, trx, item) => {
    return (item.get('channel_id')) ? {
      type: 'channel',
      item: await ChannelSerializer(req, trx, item.related('channel'))
    } : {
      type: 'message',
      item: await MessageSerializer(req, trx, item.related('message'))
    }
  }
})

export default listRoute
