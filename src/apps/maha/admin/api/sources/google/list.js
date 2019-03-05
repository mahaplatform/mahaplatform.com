import { Route } from '../../../../server'
import { getClient } from './utils'
import _ from 'lodash'

const processor = async (req, trx, options) => {

  const drive = await getClient(req, trx)

  const folder_id = _.get(req, 'query.$filter.folder_id.$eq')

  const q = _.get(req, 'query.$filter.q')

  const folder = (folder_id === 'null') ? 'root' : folder_id

  const pageToken = _.get(req, 'query.$page.next')

  const result = await Promise.promisify(drive.files.list)({
    supportsTeamDrives: true,
    includeTeamDriveItems: true,
    pageSize: 100,
    pageToken,
    orderBy: q ? null : 'folder,name',
    q: q ? `fullText contains '${q}'` : `'${folder}' in parents`,
    spaces: 'drive',
    fields: 'nextPageToken, files(id, name, mimeType, thumbnailLink)'
  })

  const records = result.data.files.map(entry => ({
    id: entry.id,
    name: entry.name,
    type: entry.mimeType.match(/folder/) ? 'folder' : 'file',
    thumbnail: entry.mimeType.match(/image/) ? entry.thumbnailLink : null,
    content_type: entry.mimeType
  }))

  return {
    next: result.data.nextPageToken || null,
    skip: pageToken ? 1 : 0,
    records
  }

}

const listRoute = new Route({
  method: 'get',
  path: '/google/files',
  processor
})

export default listRoute
