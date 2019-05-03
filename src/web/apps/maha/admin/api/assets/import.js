import { BackframeError, Route } from '../../../../../core/backframe'
import { createAssetFromUrl } from '../../../../maha/services/asset'
import AssetSerializer from '../../../serializers/asset_serializer'

const processor = async (req, trx, options) => {

  try {

    const asset = await createAssetFromUrl(req, trx, req.body.url)

    if(!asset) return null

    await asset.load(['user.photo','source'], { transacting: trx })

    return asset

  } catch(e) {

    throw new BackframeError({
      code: 404,
      message: 'Unable to load url'
    })

  }

}

const importRoute = new Route({
  method: 'post',
  path: '/assets/url',
  processor,
  serializer: AssetSerializer
})

export default importRoute
