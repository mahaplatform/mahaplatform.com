import { createAsset } from '@apps/maha/services/assets'
import { getClient } from '../../services/box'
import request from 'request-promise'
import mime from 'mime-types'
import path from 'path'

const _getContentType = (name) => {
  const ext = path.extname(name)
  const type = mime.lookup(ext)
  return type || 'text/plain'
}

const createRoute = async (req, profile) => {

  const client = await getClient(req, profile)

  const meta = await client.files.get(req.body.id)

  const url = await client.files.getDownloadURL(req.body.id)

  const file_data = await request.get({
    url,
    encoding: null
  }).promise()

  const asset = await createAsset(req, {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: profile.get('source_id'),
    source_identifier: req.body.id,
    file_name: meta.name,
    file_data,
    content_type: _getContentType(meta.name)
  })

  return asset

}

export default createRoute
