import { getClient } from '../../services/dropbox'
import mime from 'mime-types'
import path from 'path'
import _ from 'lodash'

const _getContentType = (name) => {
  const ext = path.extname(name)
  const type = mime.lookup(ext)
  return type || 'text/plain'
}

const listRoute = async (req, profile) => {

  const client = await getClient(req, profile)

  const _list = async (folder = '', cursor) => {

    const result = cursor ? await client({
      resource: 'files/list_folder/continue',
      parameters: {
        cursor
      }
    }) : await client({
      resource: 'files/list_folder',
      parameters: {
        path: folder,
        limit: 20,
        include_media_info: true
      }
    })

    return {
      entries: result.entries,
      cursor: result.has_more ? result.cursor : null
    }

  }

  const _search = async (query, start) => {

    const result = await client({
      resource: 'files/search',
      parameters: {
        path: '',
        max_results: 20,
        start: start ? parseInt(start) : 0,
        query
      }
    })

    return {
      entries: result.matches.map(match => match.metadata),
      cursor: result.more ? result.start : null
    }

  }

  const folder_id = _.get(req, 'query.$filter.folder_id.$eq')

  const folder = folder_id === 'null' ? '' : folder_id

  const q = _.get(req.query, '$filter.q')

  const next = _.get(req, 'query.$page.next')

  const result = q ? await _search(q, next) : await _list(folder, next)

  const records = result.entries.map(entry => {

    const content_type = _getContentType(entry.name)

    return {
      id: entry.id,
      type: entry['.tag'],
      name: entry.name,
      thumbnail: content_type.match(/image/) ? `/admin/dropbox/preview?path=${encodeURIComponent(entry.path_lower)}`: null,
      content_type
    }

  })

  records.pagination = {
    skip: next ? 1 : 0,
    next: result.cursor
  }

  return records

}

export default listRoute
