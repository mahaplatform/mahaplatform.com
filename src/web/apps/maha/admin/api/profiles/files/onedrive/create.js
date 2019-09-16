import { createAsset } from '../../../../../services/assets'
import { getClient } from '../../services/microsoft'
import Source from '../../../../../models/source'
import request from 'request-promise'

const createRoute = async (req, profile) => {

  const client = await getClient(req, profile)

  const result = await client.api(`/me/drive/items/${req.body.id}`).get()

  const file_data = await request.get({
    url: result['@microsoft.graph.downloadUrl'],
    encoding: null
  }).promise()

  const source = await Source.where({
    text: 'microsoft'
  }).fetch({
    transacting: req.trx
  })

  const asset = await createAsset(req, {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: source.get('id'),
    source_identifier: req.body.id,
    source_url: result.webUrl,
    file_name: result.name,
    file_data,
    content_type: result.file ? result.file.mimeType : 'plain/text'
  })

  return asset

}

export default createRoute
