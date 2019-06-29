import { createAssetFromUrl } from '../../../../../maha/services/assets'
import AssetSerializer from '../../../../serializers/asset_serializer'

const avatarRoute = async (req, res) => {

  const asset = await createAssetFromUrl(req, req.body.url)

  if(!asset) return res.status(200).respond()

  await asset.load(['user.photo','source'], {
    transacting: req.trx
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default avatarRoute
