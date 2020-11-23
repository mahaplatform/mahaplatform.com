import { createAsset } from '@apps/maha/services/assets'
import { getClient } from '../../services/dropbox'
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

  const asset = await createAsset(req, {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source: profile.get('source'),
    source_identifier: req.body.id,
    file_name: meta.name,
    file_data,
    content_type: _getContentType(meta.name)
  })

  return asset

}

export default createRoute
