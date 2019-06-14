import AssetSerializer from '../../../serializers/asset_serializer'
import { processAsset } from '../../../services/asset'

const processRoute = async (req, res) => {

  const asset = await processAsset(req.params.id)

  res.status(200).respond(asset, AssetSerializer)

}

export default processRoute
