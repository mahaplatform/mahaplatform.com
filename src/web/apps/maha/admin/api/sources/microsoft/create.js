import AssetSerializer from '../../../../serializers/asset_serializer'
import { createAsset } from '../../../../services/asset'
import { Route } from '../../../../../../core/backframe'
import Source from '../../../../models/source'
import request from 'request-promise'
import { getClient } from './utils'

const processor = async (req, trx, options) => {

  const client = await getClient(req, trx)

  const result = await client.api(`/me/drive/items/${req.body.id}`).get()

  const file_data = await request.get({ url: result['@microsoft.graph.downloadUrl'], encoding: null }).promise()

  const source = await Source.where({ text: 'microsoft' }).fetch({ transacting: trx })

  const asset = await createAsset({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: source.get('id'),
    source_identifier: req.body.id,
    source_url: result.webUrl,
    file_name: result.name,
    file_data,
    content_type: result.file ? result.file.mimeType : 'plain/text'
  }, trx)

  await asset.load(['source'], { transacting: trx })

  return AssetSerializer(req, trx, asset)

}

const createRoute = new Route({
  method: 'post',
  path: '/microsoft/files',
  processor
})

export default createRoute
