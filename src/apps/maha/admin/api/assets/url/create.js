import { createAssetFromUrl } from '@apps/maha/services/assets'
import AssetSerializer from '@apps/maha/serializers/asset_serializer'

const createRoute = async (req, res) => {

  const asset = await createAssetFromUrl(req, {
    url: req.body.url
  })

  if(!asset) return res.status(200).respond(true)

  await asset.load(['user.photo'], {
    transacting: req.trx
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default createRoute
