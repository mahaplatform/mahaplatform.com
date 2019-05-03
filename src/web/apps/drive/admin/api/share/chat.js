import { createChannel, sendMessage } from '../../../../chat/services/channels'
import { Route } from '../../../../../core/backframe'
import Asset from '../../../../maha/models/asset'

const processor = async (req, trx, options) => {

  const channel = await createChannel(req, trx, {
    user_ids: req.body.ids
  })

  const asset = await Asset.where({
    id: req.body.asset_id
  }).fetch({
    transacting: trx
  })

  await sendMessage(req, trx, {
    channel_id:  channel.get('id'),
    type: 'message',
    text: asset.get('url')
  })

  return channel

}

const chatRoute = new Route({
  method: 'post',
  path: '/chat',
  processor
})

export default chatRoute
