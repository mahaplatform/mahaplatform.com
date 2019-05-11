import AssetSerializer from '../../../serializers/asset_serializer'
import { processAsset } from '../../../services/asset'

const processRoute = async (req, res) => {

  const asset = await processAsset(req.params.id)

  const data = AssetSerializer(req, req.trx, asset)

  res.status(200).respond(data)

}

export default processRoute
