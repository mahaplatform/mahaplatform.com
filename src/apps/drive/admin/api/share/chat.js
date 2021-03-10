import { createChannel, sendMessage } from '@apps/chat/services/channels'
import Asset from '@apps/maha/models/asset'

const chatRoute = async (req, res) => {

  const channel = await createChannel(req, {
    user_ids: req.body.ids
  })

  const asset = await Asset.where({
    id: req.body.asset_id
  }).fetch({
    transacting: req.trx
  })

  await sendMessage(req, {
    channel_id:  channel.get('id'),
    type: 'message',
    text: asset.get('url')
  })

  await res.status(200).respond(channel)

}

export default chatRoute
