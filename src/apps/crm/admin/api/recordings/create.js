import AssetSerializer from '../../../../maha/serializers/asset_serializer'
import { createAssetFromUrl } from '../../../../maha/services/assets'
import socket from '../../../../../core/services/emitter'
import redis from '../../../../../core/services/redis'

const createRoute = async (req, res) => {

  const data = await redis.getAsync(`recording:${req.params.code}`)

  const { team_id, user_id } = JSON.parse(data)

  const asset = await createAssetFromUrl(req, {
    team_id,
    user_id,
    url: req.body.RecordingUrl
  })

  await asset.load(['user.photo','source'], {
    transacting: req.trx
  })

  await socket.in(`/admin/crm/recordings/${req.params.code}`).emit('message', {
    target: `/admin/crm/recordings/${req.params.code}`,
    action: 'created',
    data: {
      asset: AssetSerializer(req, asset)
    }
  })

  res.status(200).respond(true)

}

export default createRoute
