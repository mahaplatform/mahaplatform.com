import { activity } from '@core/services/routes/activities'
import ChannelSerializer from '@apps/chat/serializers/channel_serializer'
import socket from '@core/services/routes/emitter'
import { validate } from '@core/utils/validation'
import { createChannel } from '@apps/chat/services/channels'

const createRoute = async (req, res) => {

  await validate({
    ids: ['required']
  }, req.body)

  const channel = await createChannel(req, req.body.ids)

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

  res.status(200).respond(channel, ChannelSerializer)

}

export default createRoute
