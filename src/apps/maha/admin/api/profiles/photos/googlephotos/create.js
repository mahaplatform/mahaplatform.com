import { createAsset } from '@apps/maha/services/assets'
import { getClient } from '../../services/googlephotos'
import request from 'request-promise'

const createRoute = async (req, profile) => {

  await getClient(req, profile)

  const result = await request.get(`https://photoslibrary.googleapis.com/v1/mediaItems/${req.body.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      bearer: profile.get('data').access_token
    },
    json: true
  })

  const file_data = await request.get({
    url: result.baseUrl,
    encoding: null
  }).promise()

  const asset = await createAsset(req, {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: profile.get('source_id'),
    source_identifier: req.body.id,
    file_name: result.filename,
    file_data,
    content_type: result.mediaType
  })

  return asset

}

export default createRoute
