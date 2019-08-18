import { createAssetFromUrl } from '../../../../../maha/services/assets'
import AssetSerializer from '../../../../serializers/asset_serializer'

const avatarRoute = async (req, res) => {

  const asset = await createAssetFromUrl(req, {
    url: req.body.url
  })

  if(!asset) return res.status(200).respond(true)

  await asset.load(['user.photo','source'], {
    transacting: req.trx
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default avatarRoute
