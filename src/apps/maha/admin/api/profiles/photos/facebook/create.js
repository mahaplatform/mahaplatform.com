import { createAsset } from '@apps/maha/services/assets'
import { getClient } from '../../services/facebook'
import request from 'request-promise'

const create = async (req, profile) => {

  const client = await getClient(req, profile)

  const result = await client.api(req.body.id, {
    fields: ['id','name','images']
  })

  const image = result.images.reduce((largest, image) => {
    return (largest === null || image.width > largest.width) ? image : largest
  }, null)

  const file_data = await request.get({
    url: image.source,
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

export default create
