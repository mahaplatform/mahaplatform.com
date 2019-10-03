import ChannelSerializer from './channel_serializer'
import MessageSerializer from './message_serializer'

const ResultSerializer = (req, result) => result.get('channel_id') ? {
  type: 'channel',
  item: ChannelSerializer(req, result.related('channel'))
} : {
  type: 'message',
  item: MessageSerializer(req, result.related('message'))
}

export default ResultSerializer
