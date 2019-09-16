import { getClient } from './utils'
import _ from 'lodash'

const listRoute = async (req, profile) => {

  const drive = await getClient(req, profile)

  const folder_id = _.get(req, 'query.$filter.folder_id.$eq')

  const q = _.get(req, 'query.$filter.q')

  const folder = (folder_id === 'null') ? 'root' : folder_id

  const pageToken = _.get(req, 'query.$page.next')

  const result = await drive.files.list({
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

  records.pagination = {
    skip: pageToken ? 1 : 0,
    next: result.data.nextPageToken || null
  }

  return records

}

export default listRoute
