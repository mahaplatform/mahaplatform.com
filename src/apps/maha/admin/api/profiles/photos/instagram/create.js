import { createAsset } from '@apps/maha/services/assets'
import { getClient } from '../../services/instagram'
import request from 'request-promise'

const createRoute = async (req, profile) => {

  const client = await getClient(req, profile)

  const result = await Promise.promisify(client.media)(req.body.id)

  const file_data = await request.get({
    url: result.images.standard_resolution.url,
    encoding: null
  }).promise()

  const asset = await createAsset(req, {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source: profile.get('source'),
    source_identifier: req.body.id,
    file_name: `${req.body.id}.jpg`,
    file_data,
    content_type: 'image/jpeg'
  })

  return asset

}

export default createRoute
