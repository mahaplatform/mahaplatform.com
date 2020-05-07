import AssetSerializer from '../../../../serializers/asset_serializer'
import { uploadChunk } from '../../../../services/assets'

const createRoute = async (req, res) => {

  const asset = await uploadChunk(req)

  if(asset === null) return res.status(200).json({
    code: 200,
    message: 'partly done'
  })

  await asset.load(['user'], {
    transacting: req.trx
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default createRoute
