import { createAssetFromUrl } from '../../../../../maha/services/asset'
import AssetSerializer from '../../../../serializers/asset_serializer'

const avatarRoute = async (req, res) => {

  const asset = await createAssetFromUrl(req, req.trx, req.body.url)

  if(!asset) return res.status(200).respond()

  await asset.load(['user.photo','source'], {
    transacting: req.trx
  })

  res.status(200).respond(asset, (asset) => {
    return AssetSerializer(req, asset)
  })

}

export default avatarRoute
