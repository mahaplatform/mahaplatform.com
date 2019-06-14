import AssetSerializer from '../../../../serializers/asset_serializer'
import { createAsset } from '../../../../services/asset'
import Source from '../../../../models/source'
import request from 'request-promise'
import { getClient } from './utils'

const createRoute = async (req, res) => {

  const client = await getClient(req, req.trx)

  const result = await client.api(req.body.id, {
    fields: ['id','name','images']
  })

  const image = result.images.reduce((largest, image) => {
    return (largest === null || image.width > largest.width) ? image : largest
  }, null)

  const file_data = await request.get({
    url: image.source,
    encoding: null
  }).promise()

  const source = await Source.where({
    text: 'facebook'
  }).fetch({
    transacting: req.trx
  })

  const asset = await createAsset({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: source.get('id'),
    source_identifier: req.body.id,
    file_name: `${req.body.id}.jpg`,
    file_data,
    content_type: 'image/jpeg'
  }, req.trx)

  await asset.load(['source'], {
    transacting: req.trx
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default createRoute
