import AssetSerializer from '../../../../serializers/asset_serializer'
import { checkUploadedFile } from '../../../../services/assets'

const showRoute = async (req, res) => {

  const asset = await checkUploadedFile(req)

  if(asset === false) return res.status(204).json({
    code: 204,
    message: 'Unable to find asset'
  })

  if(asset === null) return res.status(200).json({
    code: 200,
    message: 'found'
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default showRoute
