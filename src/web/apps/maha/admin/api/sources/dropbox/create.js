import AssetSerializer from '../../../../serializers/asset_serializer'
import { createAsset } from '../../../../services/assets'
import Source from '../../../../models/source'
import request from 'request-promise'
import { getClient } from './utils'
import mime from 'mime-types'
import path from 'path'

const _getContentType = (name) => {
  const ext = path.extname(name)
  const type = mime.lookup(ext)
  return type || 'text/plain'
}

const createRoute = async (req, res) => {

  const client = await getClient(req, req.trx)

  const meta = await client({
    resource: 'files/get_metadata',
    parameters: {
      path: req.body.id
    }
  })

  const result = await client({
    resource: 'files/get_temporary_link',
    parameters: {
      path: req.body.id
    }
  })

  const file_data = await request.get({
    url: result.link,
    encoding: null
  }).promise()

  const source = await Source.where({
    text: 'dropbox'
  }).fetch({
    transacting: req.trx
  })

  const asset = await createAsset(req, {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: source.get('id'),
    source_identifier: req.body.id,
    file_name: meta.name,
    file_data,
    content_type: _getContentType(meta.name)
  })

  await asset.load(['source'], {
    transacting: req.trx
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default createRoute
