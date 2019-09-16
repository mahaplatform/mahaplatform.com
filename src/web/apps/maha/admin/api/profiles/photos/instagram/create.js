import { createAsset } from '../../../../../services/assets'
import Source from '../../../../../models/source'
import request from 'request-promise'
import { getClient } from './utils'

const createRoute = async (req, profile) => {

  const client = await getClient(req, profile)

  const result = await Promise.promisify(client.media)(req.body.id)

  const file_data = await request.get({
    url: result.images.standard_resolution.url,
    encoding: null
  }).promise()

  const source = await Source.where({
    text: 'instagram'
  }).fetch({
    transacting: req.trx
  })

  const asset = await createAsset(req, {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: source.get('id'),
    source_identifier: req.body.id,
    file_name: `${req.body.id}.jpg`,
    file_data,
    content_type: 'image/jpeg'
  })

  return asset

}

export default createRoute
