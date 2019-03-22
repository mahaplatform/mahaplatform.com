import ChannelSerializer from '../../../serializers/channel_serializer'
import { createChannel } from '../../../services/channels'
import { Route } from 'maha'

const activity = (req, trx, object, options) => ({
  story: 'started a conversation',
  object
})

const notification = (req, trx, object, options) => ({
  type: 'chat:conversation_status',
  recipient_ids: object.related('subscriptions').map(subscription => subscription.get('user_id')),
  subject_id: req.user.get('id'),
  story: 'started a conversation',
  object
})


const processor = async (req, trx, options) => {

  return await createChannel(req, trx, req.body.ids)

}

const createRoute = new Route({
  activity,
  rules: {
    ids: ['required']
  },
  method: 'post',
  notification,
  path: '',
  processor,
  serializer: ChannelSerializer
})

export default createRoute
