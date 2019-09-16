import request from 'request-promise'
import { getClient } from './utils'
import _ from 'lodash'

const listRoute = async (req, profile) => {

  await getClient(req, profile)

  const pageToken = _.get(req, 'query.$page.next')

  const result = await request.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      bearer: profile.get('data').access_token
    },
    qs: {
      pageSize: 100,
      pageToken
    },
    json: true
  })

  const records = result.mediaItems.map(entry => ({
    id: entry.id,
    name: entry.filename,
    image: entry.baseUrl
  }))

  records.pagination = {
    skip: pageToken ? 1 : 0,
    next: result.nextPageToken || null
  }

  return records

}

export default listRoute
