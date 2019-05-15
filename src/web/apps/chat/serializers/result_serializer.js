import ChannelSerializer from './channel_serializer'
import MessageSerializer from './message_serializer'

const ResultSerializer = (req, trx, result) => result.get('channel_id') ? {
  type: 'channel',
  item: ChannelSerializer(req, req.trx, result.related('channel'))
} : {
  type: 'message',
  item: MessageSerializer(req, req.trx, result.related('message'))
}

export default ResultSerializer
