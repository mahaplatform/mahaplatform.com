import { activity } from '../../../../../core/services/routes/activities'
import ChannelSerializer from '../../../serializers/channel_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { createChannel } from '../../../services/channels'
import Checkit from 'checkit'

const createRoute = async (req, res) => {

  await Checkit({
    ids: ['required']
  }).run(req.body)

  const channel = await createChannel(req, req.trx, req.body.ids)

  await activity(req, {
    story: 'started a conversation',
    object: channel
  })

  await socket.message(req, {
    type: 'chat:conversation_status',
    recipient_ids: channel.related('subscriptions').map(subscription => subscription.get('user_id')),
    subject_id: req.user.get('id'),
    story: 'started a conversation',
    object: channel
  })

  res.status(200).respond(channel, (channel) => {
    return ChannelSerializer(req, req.trx, channel)
  })

}

export default createRoute
