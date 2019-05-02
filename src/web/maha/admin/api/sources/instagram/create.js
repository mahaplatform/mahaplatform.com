import AssetSerializer from '../../../../serializers/asset_serializer'
import { createAsset, Route, Source } from '../../../../server'
import request from 'request-promise'
import { getClient } from './utils'

const processor = async (req, trx, options) => {

  const client = await getClient(req, trx)

  const result = await Promise.promisify(client.media)(req.body.id)

  const file_data = await request.get({ url: result.images.standard_resolution.url, encoding: null }).promise()

  const source = await Source.where({ text: 'instagram' }).fetch({ transacting: trx })

  const asset = await createAsset({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: source.get('id'),
    source_identifier: req.body.id,
    file_name: `${req.body.id}.jpg`,
    file_data,
    content_type: 'image/jpeg'
  }, trx)

  await asset.load(['source'], { transacting: trx })

  return AssetSerializer(req, trx, asset)

}

const createRoute = new Route({
  method: 'post',
  path: '/instagram/photos',
  processor
})

export default createRoute
