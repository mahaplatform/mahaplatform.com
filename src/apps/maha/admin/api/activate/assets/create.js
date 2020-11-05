import AssetSerializer from '@apps/maha/serializers/asset_serializer'
import { uploadChunk } from '@apps/maha/services/assets'

const createRoute = async (req, res) => {

  const asset = await uploadChunk(req)

  if(asset === null) return res.status(200).json({
    code: 200,
    message: 'partly done'
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default createRoute
