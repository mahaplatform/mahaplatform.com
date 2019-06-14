import { createChannel, sendMessage } from '../../../../chat/services/channels'
import Asset from '../../../../maha/models/asset'

const chatRoute = async (req, res) => {

  const channel = await createChannel(req, req.trx, {
    user_ids: req.body.ids
  })

  const asset = await Asset.where({
    id: req.body.asset_id
  }).fetch({
    transacting: req.trx
  })

  await sendMessage(req, req.trx, {
    channel_id:  channel.get('id'),
    type: 'message',
    text: asset.get('url')
  })

  res.status(200).respond(channel)

}

export default chatRoute
