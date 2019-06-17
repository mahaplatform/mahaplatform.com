import { getClient } from './utils'
import _ from 'lodash'

const listRoute = async (req, res) => {

  const client = await getClient(req, req.trx)

  const folder_id = _.get(req, 'query.$filter.folder_id.$eq') || 'null'

  const folder = folder_id === 'null' ? '/root' : `/items/${folder_id}`

  const skiptoken = _.get(req, 'query.$page.next')

  const q = _.get(req.query, '$filter.q')

  const endpoint = q ? `/search(q='${q}')` : '/children'

  const skip = skiptoken ? `$skiptoken=${skiptoken}` : ''

  const url = `/me/drive${folder}${endpoint}?$expand=thumbnails${skip}`

  const result = await client.api(url).get()


  const records = result.value.map(entry => ({
    id: entry.id,
    type: entry.file ? 'file' : 'folder',
    content_type: entry.file ? entry.file.mimeType : 'plain/text',
    thumbnail: entry.file && entry.file.mimeType.match(/image/) ? entry.thumbnails[0].medium.url : null,
    name: entry.name
  }))

  records.pagination = {
    skip: skiptoken ? 1 : 0,
    next: result['@odata.nextLink'] ? result['@odata.nextLink'].match(/skiptoken=(.*)/)[1] : null
  }

  res.status(200).respond(records)

}

export default listRoute
