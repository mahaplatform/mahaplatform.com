import AssetSerializer from '@apps/maha/serializers/asset_serializer'
import { processAsset } from '@apps/maha/services/assets'

const processRoute = async (req, res) => {

  const asset = await processAsset(req.params.id)

  await res.status(200).respond(asset, AssetSerializer)

}

export default processRoute
