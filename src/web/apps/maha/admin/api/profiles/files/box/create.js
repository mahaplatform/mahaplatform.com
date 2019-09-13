import { createAsset } from '../../../../../services/assets'
import Source from '../../../../../models/source'
import { getClient } from './utils'
import request from 'request-promise'
import mime from 'mime-types'
import path from 'path'

const _getContentType = (name) => {
  const ext = path.extname(name)
  const type = mime.lookup(ext)
  return type || 'text/plain'
}

const createRoute = async (req, profle) => {

  const client = await getClient(req, profle)

  const meta = await client.files.get(req.body.id)

  const url = await client.files.getDownloadURL(req.body.id)

  const file_data = await request.get({ url, encoding: null }).promise()

  const source = await Source.where({
    text: 'box'
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

  return asset

}

export default createRoute
